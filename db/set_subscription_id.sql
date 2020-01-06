-- UPDATE customer
-- SET sub_id = $1,
-- sub_interval = $3
-- WHERE cust_id = $2;

insert into subscription(cust_id, sub_id, interval, start_date, renew_date)
values ($1, $2, $3, $4, $5)

update customer_tree
set sub_id = $2
where cust_id = $1 and sub_id is null