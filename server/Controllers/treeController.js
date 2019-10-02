module.exports = {
    getTree: async (req, res, next) => {
        const db = req.app.get('db')
        const {cust_id} = req.params
        if (req.session.user.tree) return res.status(200).send(req.session.user.tree)
        if (cust_id === 'null') return res.sendStatus(200)
        let tree = await db.get_tree(cust_id)
        req.session.user.tree = tree
        res.status(200).send(tree)
    }
}