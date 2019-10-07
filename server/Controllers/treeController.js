module.exports = {
    getTree: async (req, res, next) => {
        const db = req.app.get('db')
        const {cust_id} = req.params
        if (req.session.user.tree/*  && cust_id !== 'null' */) return res.status(200).send(req.session.user.tree)
        if (cust_id === 'null') return res.sendStatus(200)
        let tree = await db.get_tree(cust_id)
        console.log(tree)
        req.session.user.tree = tree
        res.status(200).send(tree)
    },
    saveTree: async (req, res, next) => {
        const db = req.app.get('db')
        const {cust_id} = req.params
        const tree = req.body
        let db_tree = await db.get_tree(cust_id)
        let noMatch = tree.filter(el => {
            return !db_tree.some(ele => ele.tree_rel_id === el.tree_rel_id)
        })
        let match = tree.filter(el => {
            return db_tree.some(ele => ele.tree_rel_id === el.tree_rel_id)
        })
        for (let key in match){
            const result = await db.save_tree([
                match[key].rel_name,
                match[key].rel_relationship,
                match[key].rel_delivery,
                match[key].rel_bday_mo,
                match[key].rel_bday_day,
                match[key].card_id,
                cust_id,
                match[key].tree_rel_id
            ]).catch(err => console.log(`For In Match has an error: ${err}`))
        }
        for (let key in noMatch){
            const result = await db.add_to_tree([
                cust_id,
                noMatch[key].rel_name,
                noMatch[key].rel_relationship,
                noMatch[key].rel_delivery,
                noMatch[key].card_id,
                noMatch[key].tree_rel_id,
                noMatch[key].rel_bday_mo,
                noMatch[key].rel_bday_day
            ]).catch(err => console.log(`For In noMatch has an error: ${err}`))
        }
        let updated_tree = await db.get_tree(cust_id)
        req.session.user.tree = updated_tree
        res.status(200).send(req.session.user.tree)
    },
    deleteTree: async (req, res, next) => {
        const db = req.app.get('db')
        const {cust_id, tree_rel_id} = req.body
        let result = await db.delete_tree([cust_id, tree_rel_id])
        req.session.user.tree = result
        let tree = await db.get_tree(cust_id)
        res.status(200).send(tree)
    }
}