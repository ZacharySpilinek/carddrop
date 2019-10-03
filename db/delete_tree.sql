DELETE FROM customer_tree
WHERE cust_id = $1 AND tree_rel_id = $2;

SELECT tree_rel_id, rel_name, rel_relationship, rel_delivery, card_id, rel_bday_mo, rel_bday_day FROM customer_tree
WHERE cust_id = $1
ORDER BY tree_rel_id;