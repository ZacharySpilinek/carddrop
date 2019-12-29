SELECT ct.tree_rel_id, ct.card_id, ca.price, ca.img_out, ca.relationship, ct.bought FROM customer_tree ct
JOIN cards ca ON ct.card_id = ca.card_id
WHERE ct.cust_id = $1
ORDER BY tree_rel_id;