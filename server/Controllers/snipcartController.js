
module.exports = {
    snipcartWebhook: (req, res, next) => {
        const db = req.app.get('db')
        if (req.body.eventName === "subscription.created"){
            updateSubId(req.body)
        }
        res.sendStatus(200)
    },
    getAllOrders: async (req, res, next) => {
        const API_KEY = process.env.REACT_APP_SNIPCART_SECRET_KEY
        axios.get('https://app.snipcart.com/api/orders', {auth: {username: API_KEY, password: ''}}).then(result => {
            res.status(200).send(result.data)
        }).catch(err => console.log(`Error: ${err}`))
    }/* ,
    updateSubId: async (req, res, next) => {
        console.log(req)
        // const db = req.app.get('db')
        // const user = await db.find_user(req.body.content.user.email)
        // const {cust_id} = user
        // await db.set_subscription_id()
    } */
}

updateSubId = (webhook) => {
    console.log(webhook)
}