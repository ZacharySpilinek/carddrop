UPDATE customer_tree
SET tree_rel_id = $1
where cust_id = $2 AND tree_rel_id = $3;