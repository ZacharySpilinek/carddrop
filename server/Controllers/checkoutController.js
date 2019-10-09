
module.exports = {
    getYearlyDropTotal: async (req, res, next) => {
        // const db = req.app.get('db')
        const {total} = req.params
        let toSend = {
            "id": "carddrop-yearly-drop",
            "price": +total,
            "url": `https://thecarddrop.com/api/checkout/yearly-drop/${total}`
        }
        res.status(200).send(toSend)
    }
}