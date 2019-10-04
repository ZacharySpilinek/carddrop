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
    },
    saveCard: async (req, res, next) => {
        const db = req.app.get('db')
        const {cust_id, selected_cards} = req.body
        const {card_id, tree_rel_id} = selected_cards
        let tree = await db.save_card([card_id, cust_id, tree_rel_id])
        res.sendStatus(200)
    },
    savedCards: async (req, res, next) => {
        const db = req.app.get('db')
        const {cust_id} = req.params
        let selectedCards = await db.get_selected_cards(cust_id)
        req.session.user.selected_cards = selectedCards
        res.status(200).send(selectedCards)
    }
}