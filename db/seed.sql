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