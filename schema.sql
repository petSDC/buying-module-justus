
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(300),
  free_shipping BOOLEAN,
  option_name text,
  different_options VARCHAR(50)[],
  price numeric(2)[],
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

CREATE TABLE IF NOT EXISTS countries_shipping (
  id SERIAL PRIMARY KEY,
  product_id integer REFERENCES products (id),
  country_id integer REFERENCES countries (id)
);

select products.*, feedback.product_id, users.products_favorited, countries.* 
from products, feedback, users, countries
where product.id = 8000000
and feedback.product_id = 8000000
and countries.id = countries_shipping.country_id
and countries_shipping.product_id = 8000000
and favorited_by_users.product_id = 8000000
and users.id = favorited_by_users.user_id
and 