var testCtrl = require('./testController')

module.exports = {
    snipcartWebhook: (req, res, next) => {
        const db = req.app.get('db')
        if (req.body.eventName === "subscription.created"){
            testCtrl.updateSubId(db, req.body)
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