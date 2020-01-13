module.exports = {
    getUser: (req, res, next) => {
        if (!req.session.user) return res.sendStatus(200)
        let {cust_id, first_name, last_name, email, sub_id, sub_interval} = req.session.user
        let currentUser = {cust_id, first_name, last_name, email, sub_id, sub_interval}
        // res.status(200).send(req.session.user)
        res.status(200).send(currentUser)
    },
    saveUser: async (req, res, next) => {
        const db = req.app.get('db')
        const {firstName, lastName, email, cust_id} = req.body
        let result = await db.change_user_info([firstName, lastName, email, cust_id])
        req.session.user = {...req.session.user,
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            email: result[0].email}
        res.sendStatus(200)
    },
    getSession: (req, res, next) => {
        res.status(200).send(req.session.user)
    },
    addStamps: (req, res, next) => {
        const {mailCount} = req.body
        req.session.user.stamps = mailCount
        res.sendStatus(200)
    },
    getStamps: (req, res, next) => {
        if (req.session.user.stamps !== undefined) return res.status(200).send(req.session.user.stamps)
        let stamps = {stamps: 0}
        res.status(200).send(stamps)
    }
}