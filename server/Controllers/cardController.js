module.exports = {
    getCategories: async (req, res, next) => {
        const db = req.app.get('db')
        let categories = await db.get_categories()
        let filteredCategories = []
        categories.forEach(el => {
            filteredCategories.push(el.relationship)
        })
        console.log(filteredCategories)
        res.status(200).send(filteredCategories)
    }
}