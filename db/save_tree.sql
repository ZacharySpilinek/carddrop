UPDATE customer_tree
SET rel_name = $1,
    rel_relationship = $2,
    rel_delivery = $3,
    rel_bday_mo = $4,
    rel_bday_day = $5,
    card_id = $6
where cust_id = $7 AND tree_rel_id = $8;