UPDATE customer
SET sub_id = $1,
sub_interval = $3
WHERE cust_id = $2;