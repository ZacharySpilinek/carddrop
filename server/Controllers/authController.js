const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res, next) => {
        const db = req.app.get('db')
        const {email, password, first_name, last_name} = req.body
        const result = await db.find_user({email})
        if (result[0]) return res.status(200).send({message: 'Email already in use. Please try a different one.'})
        
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = await db.create_user([first_name, last_name, email])
        db.add_hash([newUser[0].cust_id, hash])

        req.session.user = newUser[0]
        req.session.userid = newUser[0].id

        /* newUser[0] is {
            cust_id: 1,
            first_name: 'first name',
            last_name: 'last name',
            email: 'email@email.com',
            sub_interval: null,
            sub_id: null
        } */
        res.status(200).send(newUser[0])
    },
    login: async (req, res, next) => {
        const db = req.app.get('db')
        const {email, password} = req.body
        const result = await db.find_user({email})
        if (!result[0]) return res.status(404).send({message: 'Email incorrect. Please try again.'})
        const hashCheck = bcrypt.compareSync(password, result[0].hash)
        if (!hashCheck) return res.status(403).send({message: 'Password incorrect. Please try again'})
        const {cust_id, first_name, last_name, sub_interval, sub_id} = result[0]
        let user = {cust_id, first_name, last_name, email, sub_interval, sub_id}
        req.session.user = user
        /* user is {
            cust_id: 1,
            first_name: 'first name',
            last_name: 'last name',
            email: 'email@email.com',
            sub_interval: null or 1,
            sub_id: null or 1
        } */
        res.status(200).send(user)
    },
    logout: async (req, res, next) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}