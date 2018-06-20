
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(300),
  free_shipping BOOLEAN,
  quantity integer,
  handmade BOOLEAN,
  made_to_order BOOLEAN,
  materials VARCHAR(200),
  gift_message BOOLEAN,
  gift_card BOOLEAN,
  shipping_min_days SMALLINT,
  shipping_max_days SMALLINT,
  shop_location VARCHAR(100),
  shipping_price SMALLINT
);

CREATE TABLE IF NOT EXISTS feedback (
  id SERIAL PRIMARY KEY,
  product_id integer REFERENCES products (id)
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  products_favorited VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS favorited_by_users (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users (id),
  product_id integer REFERENCES products (id)
);

CREATE TABLE IF NOT EXISTS countries(
  id SERIAL PRIMARY KEY,
  country_name VARCHAR(100),
  shipping_multiplier integer
);

CREATE TABLE IF NOT EXISTS counteries_shipping (
  id SERIAL PRIMARY KEY,
  product_id integer REFERENCES products (id),
  country_id integer REFERENCES countries (id)
);

INSERT INTO products (product_name) VALUES ('name');
INSERT INTO products (product_name) VALUES ('name');
INSERT INTO products (product_name) VALUES ('name');
INSERT INTO products (product_name) VALUES ('name');
INSERT INTO products (product_name) VALUES ('name');
INSERT INTO products (product_name) VALUES ('name');
INSERT INTO products (product_name) VALUES ('name');