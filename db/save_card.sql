UPDATE customer_tree
SET card_id = $1
WHERE cust_id = $2 AND tree_rel_id = $3;