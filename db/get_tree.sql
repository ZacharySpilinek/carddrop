SELECT ct.tree_rel_id, ct.rel_name, ct.rel_relationship, ct.rel_bday, ct.rel_delivery, ct.card_id FROM customer cu
JOIN customer_tree ct ON cu.cust_id = ct.cust_id
WHERE cu.cust_id = $1;