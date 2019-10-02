CREATE TABLE customer(
 cust_id serial PRIMARY KEY,
 first_name VARCHAR(60),
 last_name VARCHAR(60),
 email VARCHAR(120),
 sub_interval VARCHAR(20)
)

ALTER TABLE customer
ADD COLUMN sub_id INT;

CREATE TABLE customer_login(
 customer_login_id serial PRIMARY KEY,
 cust_id INT REFERENCES customer(cust_id),
 hash TEXT
);

CREATE TABLE customer_tree(
 id SERIAL PRIMARY KEY,
 cust_id INT REFERENCES customer(cust_id),
 rel_name VARCHAR(120),
 rel_bday DATE,
 rel_relationship VARCHAR(120),
 rel_delivery VARCHAR(120),
 card_id INT REFERENCES cards(card_id)
);

CREATE TABLE cards(
 card_id SERIAL PRIMARY KEY,
 relationship VARCHAR(120),
 price INT,
 img_out text,
 img_in text,
 size VARCHAR(25),
 weight_oz INT
);

INSERT INTO customer(first_name, last_name, email, sub_interval)
VALUES('Zachary', 'Spilinek', 'zach@thecarddrop.com', null);

INSERT INTO customer_tree(cust_id, rel_name, rel_bday, rel_relationship, rel_delivery, tree_rel_id)
VALUES(1, 'McKay', '2019-09-01', 'friend', 'mail', 0),
    (2, 'Spencer', '2019-09-01', 'coworker', 'in-person', 1);
    
INSERT INTO cards(relationship, price, img_out, img_in, size, weight_oz)
VALUES('neutral', 249, 'https://cdn.shopify.com/s/files/1/0527/2397/products/EM_GC308_StressfulConvoBday_2_75487797-e5c0-424b-b371-659600ead250.jpg?v=1524063269', 'https://cdn.shopify.com/s/files/1/0051/0355/0582/products/Kate-Smith-Super-Human-Birthday-Card-Inside.jpg?v=1547665335', '5x7', 1);