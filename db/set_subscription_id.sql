UPDATE customer
SET sub_id = $1,
sub_interval = $3
WHERE email = $2;