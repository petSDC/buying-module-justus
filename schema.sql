
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

create index country_products on countries_shipping (product_id);
create index feedback_products on feedback (product_id);
create index favorite_products on favorited_by_users (product_id);
create index favorite_users on favorited_by_users (user_id);

CREATE PROCEDURE selectAll(IN params int)) 
select countries.*, products.*,
(select count(product_id) from feedback
where feedback.product_id = params) as feedbackCount,
(select count(users.products_favorited) from products
left join favorited_by_users
on products.id = favorited_by_users.product_id
left join users
on favorited_by_users.user_id = users.id
where products.id = params) as usersCount
from products 
left join countries_shipping
on products.id = countries_shipping.product_id
left join countries
on countries_shipping.country_id = countries.id
where products.id = params;

CALL GetEmployees('Finance');

-- copy countries_shipping (product_id, country_id) from '/Users/justuskovats-wildenradt/hack-reactor/sdc/buying-module-justus/countriesShipping.txt' (delimiter(','));
-- copy users (products_favorited) from '/Users/justuskovats-wildenradt/hack-reactor/sdc/buying-module-justus/users1.txt' (delimiter(','));
-- copy feedback (product_id) from '/Users/justuskovats-wildenradt/hack-reactor/sdc/buying-module-justus/feedback1.txt' (delimiter(','));
-- copy favorited_by_users (user_id, product_id) from '/Users/justuskovats-wildenradt/hack-reactor/sdc/buying-module-justus/favorited_by_users1.txt' (delimiter(','));

CREATE OR REPLACE FUNCTION selectAll(params int)
  RETURNS Table(
  country_name VARCHAR(100),
  shipping_multiplier integer,
  id int,
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
  shipping_price SMALLINT,
  feedbackCount bigint,
  usersCount bigint
  ) AS
$func$
BEGIN
   RETURN QUERY EXECUTE
select
  countries.country_name,
  countries.shipping_multiplier,
  products.*,
  (
    select
      count(product_id)
    from
      feedback
    where
      feedback.product_id = params
  ) as feedbackCount,
  (
    select
      count(users.products_favorited)
    from
      products
      left join favorited_by_users on products.id = favorited_by_users.product_id
      left join users on favorited_by_users.user_id = users.id
    where
      products.id = params
  ) as usersCount
from
  products
  left join countries_shipping on products.id = countries_shipping.product_id
  left join countries on countries_shipping.country_id = countries.id
where
  products.id = params;
END
$func$  LANGUAGE plpgsql;


CREATE FUNCTION getall1(params int)
  RETURNS void AS
  $$
      BEGIN
select countries.country_name, countries.shipping_multiplier, products.*,
(select count(product_id) from feedback
where feedback.product_id = 9000014) as feedbackCount,
(select count(users.products_favorited) from products
left join favorited_by_users
on products.id = favorited_by_users.product_id
left join users
on favorited_by_users.user_id = users.id
where products.id = 9000014) as usersCount
from products 
left join countries_shipping
on products.id = countries_shipping.product_id
left join countries
on countries_shipping.country_id = countries.id
where products.id = 9000014;
      END;
  $$
  LANGUAGE 'plpgsql'
  COST 100;

  explain analyze select selectAll(9000011);

select products.*, countries.country_name, countries.shipping_multiplier, feedback.product_id, users.id from products 
left join countries_shipping
on products.id = countries_shipping.product_id
left join countries
on countries_shipping.country_id = countries.id
left join favorited_by_users
on products.id = favorited_by_users.product_id
left join users
on favorited_by_users.user_id = users.id
left join feedback
on products.id = feedback.product_id
where products.id = 9000017;


copy products (product_name, free_shipping, option_name, different_options, price, quantity, handmade, made_to_order, materials, gift_message, gift_card, shipping_min_days, shipping_max_days, shipping_p
rice) from '/products' delimiter ',' csv;\quantity