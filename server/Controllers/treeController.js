module.exports = {
    getTree: async (req, res, next) => {
        const db = req.app.get('db')
        const {cust_id} = req.params
        if (req.session.user.tree) return res.status(200).send(req.session.user.tree)
        if (cust_id === 'null') return res.sendStatus(200)
        let tree = await db.get_tree(cust_id)
        req.session.user.tree = tree
        res.status(200).send(tree)
    },
    saveTree: async (req, res, next) => {
        const db = req.app.get('db')
        const {cust_id} = req.params
        const tree = req.body
        let db_tree = await db.get_tree(cust_id)
        // let noMatch = []
        let match = []
        tree.forEach(el => db_tree.forEach(ele => {
            if (el.tree_rel_id === ele.tree_rel_id){
                match.push(el)
            }
        }))
        let noMatch = tree.filter(el => {
            return !db_tree.some(ele => ele.tree_rel_id === el.tree_rel_id)
        })
        console.log(match)
    }
}