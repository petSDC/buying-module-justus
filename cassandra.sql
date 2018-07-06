CREATE TABLE IF NOT EXISTS products (
  id int,
  name text,
  freeShipping BOOLEAN,
  optionsName text,
  differentOptions list<text>,
  price list<decimal>,
  quantity int,
  handmade BOOLEAN,
  madeToOrder BOOLEAN,
  materials BOOLEAN,
  giftMessage BOOLEAN,
  giftCard BOOLEAN,
  shippingCountries list<text>,
  shippingPrice list<decimal>,
  feedback int,
  favoritedBy int,
  shippingMin int,
  shippingMax int,
  shopLocation text,
  PRIMARY KEY (id, name)
);

CREATE TABLE IF NOT EXISTS users (
  id int,
  username text,
  reviewsWritten int,
  productsFavorited int,
);

CREATE TABLE IF NOT EXISTS addToCart (
  id int,
  productName text,
  quantity int,
  price int,
  shppingCost set<int>,
);


-- INSERT INTO petsdc_buying.products (id, name, freeShipping, optionsName, differentOptions, price, quantity, handmade, madeToOrder, materials, giftMessage, giftCard, shippingCountries, shippingPrice, feedback, favoritedBy, shippingMin, shippingMax)
--              values (100000010, 'justus', true, 'justu', ['a'], [3.43], 10, true, true, true, true, true, ['sdf], [45.3], 455, 453,2,9);
