SELECT cu.cust_id, cu.first_name, cu.last_name, cu.email, cu.sub_interval, cu.sub_id, cl.hash FROM customer cu
JOIN customer_login cl ON cu.cust_id = cl.cust_id
WHERE email = ${email};