CREATE TABLE IF NOT EXISTS products (
  id int,
  name text,
  freeShipping text,
  quantity int,
  handmade text,
  madeToOrder text,
  materials text,
  giftMessage text,
  giftCard text,
  shippingCountries text,
  feedback int,
  favoritedBy int,
  shippingMin int,
  shippingMax int,
  PRIMARY KEY (id, name)
);