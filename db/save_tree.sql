UPDATE customer_tree
SET rel_name = 'Jonathan',
    rel_relationship = 'coworker',
    rel_delivery = 'mail',
    rel_bday_mo = 7,
    rel_bday_day = 24
where cust_id = 1 AND tree_rel_id = 0;