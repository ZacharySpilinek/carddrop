const axios = require('axios')

module.exports = {
    getYearlyDropTotal: async (req, res, next) => {
        // const db = req.app.get('db')
        const {total, cards, stamps, cust_id} = req.params
        let newTotal = +total + ((stamps * 55) / 100)
        let toSend = {
            "id": `carddrop-yearly-drop-${cards}c-${stamps}s-${cust_id}`,
            "price": newTotal,
            "url": `https://thecarddrop.com/api/checkout/yearly-drop/${total}/${cards}/${stamps}/${cust_id}`
        }
        res.status(200).send(toSend)
    },
    testFn: async (req, res, next) => {
        res.sendStatus(200)
    },
    anotherTest: async (req, res, next) => {
        const API_KEY = process.env.REACT_APP_SNIPCART_SECRET_KEY
        axios.get('https://app.snipcart.com/api/orders', {auth: {username: API_KEY, password: ''}}).then(result => {
            res.status(200).send(result.data)
        }).catch(err => console.log(`Error: ${err}`))
    }
}