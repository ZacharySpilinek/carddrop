module.exports = {
    getCategories: async (req, res, next) => {
        const db = req.app.get('db')
        let categories = await db.get_categories()
        let filteredCategories = []
        categories.forEach(el => {
            filteredCategories.push(el.relationship)
        })
        res.status(200).send(filteredCategories)
    },
    getCardsByCategory: async (req, res, next) => {
        const db = req.app.get('db')
        const {category} = req.query
        let result = await db.get_cards_by_category(category)
        res.status(200).send(result)
    }
}