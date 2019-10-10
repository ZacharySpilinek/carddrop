module.exports = {
    updateSubId: async (test) => {
        console.log(test)
        // const db = req.app.get('db')
        // const user = await db.find_user(req.body.content.user.email)
        // const {cust_id} = user
        // await db.set_subscription_id()
    },
    snipcartWebhook: (req, res, next) => {
        const db = req.app.get('db')
        if (req.body.eventName === "subscription.created"){
            this.updateSubId(req.body)
        }
        res.sendStatus(200)
    },
    getAllOrders: async (req, res, next) => {
        const API_KEY = process.env.REACT_APP_SNIPCART_SECRET_KEY
        axios.get('https://app.snipcart.com/api/orders', {auth: {username: API_KEY, password: ''}}).then(result => {
            res.status(200).send(result.data)
        }).catch(err => console.log(`Error: ${err}`))
    }
}

// updateSubId = (webhook) => {
//     const db = app.get('db')
//     const user = await db.find_user(req.body.content.user.email)
//     console.log(user)
// }