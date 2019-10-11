SELECT cu.first_name, cu.email, ct.rel_name, ct.rel_bday_mo, ct.rel_bday_day FROM customer cu
JOIN customer_tree ct ON cu.cust_id = ct.cust_id
WHERE ct.rel_bday_mo = $1 AND ct.rel_bday_day = $2 AND sub_interval IS NOT null;