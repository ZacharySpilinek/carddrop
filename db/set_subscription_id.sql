UPDATE customer
SET sub_id = $1
WHERE cust_id = $2;