
module.exports = {
    getYearlyDropTotal: async (req, res, next) => {
        // const db = req.app.get('db')
        const {total, cards, stamps} = req.params
        let newTotal = +total + ((stamps * 55) / 100)
        let toSend = {
            "id": `carddrop-yearly-drop-${cards}c-${stamps}s`,
            "price": newTotal,
            "url": `https://thecarddrop.com/api/checkout/yearly-drop/${total}/${cards}/${stamps}`
        }
        res.status(200).send(toSend)
    }
}