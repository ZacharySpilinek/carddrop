INSERT INTO customer(first_name, last_name, email, sub_interval)
VALUES($1, $2, $3, null)
RETURNING *;