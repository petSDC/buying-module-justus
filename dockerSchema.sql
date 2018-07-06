CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(300)
);

-- CREATE TABLE IF NOT EXISTS feedback (
--   id SERIAL PRIMARY KEY,
--   product_id integer
-- );

-- CREATE TABLE IF NOT EXISTS users (
--   id SERIAL PRIMARY KEY,
--   products_favorited VARCHAR(200)
-- );

-- CREATE TABLE IF NOT EXISTS favorited_by_users (
--   id SERIAL PRIMARY KEY,
--   user_id integer,
--   product_id integer
-- );

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

\copy products (product_name) from '../data/product.csv' (delimiter(','));
-- \copy feedback (product_id) from '../data/DOC_feedback.txt' (delimiter(','));
-- \copy users (products_favorited) from '../data/users.csv' (delimiter(','));
-- \copy favorited_by_users (user_id, product_id) from '../data/favorited_by_users.csv' (delimiter(','));
\copy countries (country_name, shipping_multiplier) from '../data/DOC_countries.txt' (delimiter(','));
\copy countries_shipping (product_id, country_id) from '../data/DOC_countries_shiping.txt' (delimiter(','));


-- ALTER TABLE feedback 
-- ADD CONSTRAINT feedback_key FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE;

-- ALTER TABLE favorited_by_users 
-- ADD CONSTRAINT favorited_user_key FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

-- ALTER TABLE favorited_by_users 
-- ADD CONSTRAINT favorited_product_key FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE;

ALTER TABLE countries_shipping 
ADD CONSTRAINT countries_product_key FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE;

-- ALTER TABLE countries_shipping 
-- ADD CONSTRAINT countries_country_key FOREIGN KEY (country_id) REFERENCES countries (id) ON DELETE CASCADE;

create index country_products on countries_shipping (product_id);
-- create index feedback_products on feedback (product_id);
-- create index favorite_products on favorited_by_users (product_id);
-- create index favorite_users on favorited_by_users (user_id);