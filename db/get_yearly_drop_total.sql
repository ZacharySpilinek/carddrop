SELECT sum(ca.price) FROM customer_tree ct
JOIN cards ca ON ct.card_id = ca.card_id
where cust_id = $1;