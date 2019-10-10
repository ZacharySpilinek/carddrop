UPDATE customer
SET sub_id = $1
WHERE email = $2;