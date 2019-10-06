module.exports = {
    getUser: (req, res, next) => {
        res.status(200).send(req.session.user)
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
    }
}