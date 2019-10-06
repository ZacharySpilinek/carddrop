UPDATE customer
SET first_name = $1,
last_name = $2,
email = $3
WHERE cust_id = $4;

SELECT * FROM customer
WHERE cust_id = $4;