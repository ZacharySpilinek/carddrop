var snipcartWebhookCtrl = require('./snipcartWebhookController')
const axios = require('axios')

module.exports = {
    snipcartWebhook: (req, res, next) => {
        const db = req.app.get('db')
        if (req.body.eventName === "subscription.created"){
            snipcartWebhookCtrl.updateSubId(db, req.body)
        }
        res.sendStatus(200)
    },
    getAllOrders: async (req, res, next) => {
        const API_KEY = process.env.REACT_APP_SNIPCART_SECRET_KEY
        axios.get('https://app.snipcart.com/api/orders', {auth: {username: API_KEY, password: ''}}).then(result => {
            res.status(200).send(result.data)
        }).catch(err => console.log(`Error: ${err}`))
    },
    pauseSubscription: async (req, res, next) => {
        const {sub_id} = req.body
        const API_KEY = process.env.REACT_APP_SNIPCART_SECRET_KEY
        axios.post(`https://app.snipcart.com/api/subscriptions/${sub_id}/pause`, {}, {auth: {username: API_KEY, password: ''}, headers: {"Accept": "application/json"}}).then(result => {
            if (result.data.status === "Paused"){
                console.log('Subscription Successfully Paused')
                res.sendStatus(200)
            } else {
                console.log(result.data)
                res.sendStatus(400)
            }
        })
    }
}