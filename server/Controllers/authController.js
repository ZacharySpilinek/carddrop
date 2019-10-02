const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res, next) => {
        const db = req.app.get('db')
        const {email, password1, f_name, l_name} = req.body
        const result = await db.find_user({email})
        if (result[0]) return res.status(400).send({message: 'Email already in use. Please try a different one.'})
        
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password1, salt)

        const newUser = await db.create_user([f_name, l_name, email])
        db.add_hash([newUser[0].cust_id, hash])

        req.session.user = newUser[0]
        req.session.userid = newUser[0].id

        res.status(200).send(newUser)
    },
    login: async (req, res, next) => {
        const db = req.app.get('db')
        const {email, password} = req.body
        const result = await db.find_user({email})
        if (!result[0]) return res.status(200).send({message: 'Email incorrect. Please try again.'})
        const hashCheck = bcrypt.compareSync(password, result[0].hash)
        if (!hashCheck) return res.status(200).send({message: 'Password incorrect. Please try again'})
        const {cust_id, first_name, last_name, sub_interval, sub_id} = result[0]
        let user = {cust_id, first_name, last_name, email, sub_interval, sub_id}
        req.session.user = user
        res.status(200).send(user)
    },
    logout: async (req, res, next) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}