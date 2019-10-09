
module.exports = {
    getYearlyDropTotal: async (req, res, next) => {
        // needs to get amount of items in cart
        // it does this by joining customer_tree with cards
        // where cust_id = cust_id from req.session.user.cust_id
        // it returns sum of card prices
        const db = req.app.get('db')
        const {cust_id} = req.session.user
        let result = await db.get_yearly_drop_total(cust_id)
        // a new var divides it by 100
        let total = result[0] / 100
        // it sends back a new JSON file with:
            // "id": "carddrop-yearly-drop",
            // "price": theVarFromAbove
            // "url": "https://thecarddrop.com/api/checkout/yearly-drop"
        let toSend = {
            "id": "carddrop-yearly-drop",
            "price": total,
            "url": `https://thecarddrop.com/api/checkout/yearly-drop/${cust_id}`
        }
        res.status(200).send(toSend)
    }
}