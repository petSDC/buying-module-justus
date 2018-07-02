CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(300),
  free_shipping BOOLEAN,
  option_name text,
  different_options text,
  price text,
  quantity integer,
  handmade BOOLEAN,
  made_to_order BOOLEAN,
  materials BOOLEAN,
  gift_message BOOLEAN,
  gift_card BOOLEAN,
  shipping_min_days SMALLINT,
  shipping_max_days SMALLINT,
  shipping_price SMALLINT
) PARTITION BY RANGE (id);

CREATE TABLE IF NOT EXISTS products_1 PARTITION OF products
 FOR VALUES FROM (1) TO (5000000);

CREATE TABLE IF NOT EXISTS products_2 PARTITION OF products
 FOR VALUES FROM (5000001) TO (10000000);

CREATE TABLE IF NOT EXISTS feedback (
  id SERIAL PRIMARY KEY,
  product_id integer
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  products_favorited VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS favorited_by_users (
  id SERIAL PRIMARY KEY,
  user_id integer,
  product_id integer
) PARTITION BY RANGE (id);

CREATE TABLE IF NOT EXISTS products_1 PARTITION OF favorited_by_users
 FOR VALUES FROM (1) TO (25000000);

CREATE TABLE IF NOT EXISTS products_2 PARTITION OF favorited_by_users
 FOR VALUES FROM (25000001) TO (50000000);

CREATE TABLE IF NOT EXISTS countries(
  id SERIAL PRIMARY KEY,
  country_name VARCHAR(100),
  shipping_multiplier integer
);

CREATE TABLE IF NOT EXISTS countries_shipping (
  id SERIAL PRIMARY KEY,
  product_id integer,
  country_id integer
);