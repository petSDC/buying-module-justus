const { Client } = require('pg');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    password: '',
    database: 'petsdc_buying',
    port: 5432,
  }
});
const fake = require('faker');
const faker = require('./fakeData');

const client = new Client({
  host: 'localhost',
  database: 'petsdc_buying',
  password: '',
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error('failed to connect to postgres');
  } else {
    console.log('connected to postgres');
  }
});

const retrieve = (params, callback) => {
  const queryStr = `SELECT * FROM products where id = ${params.id}`;
  client.query(queryStr, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};
// CREATE TABLE IF NOT EXISTS products (
//   id SERIAL PRIMARY KEY,
//   product_name VARCHAR(300),
//   free_shipping BOOLEAN,
//   option_name text,
//   different_options VARCHAR(50)[],
//   price int[],
//   quantity integer,
//   handmade BOOLEAN,
//   made_to_order BOOLEAN,
//   materials VARCHAR(200),
//   gift_message BOOLEAN,
//   gift_card BOOLEAN,
//   shipping_min_days SMALLINT,
//   shipping_max_days SMALLINT,
//   shop_location VARCHAR(100),
//   shipping_price SMALLINT
// );

const productsQuery = {
  product_name: fake.commerce.productName(),
  free_shipping: fake.random.boolean(),
  option_name: 'Sizes',
  different_options: ['4x6 inches', '5x7 inches', '8x10 inches', '11x14 inches', '12x16 inches', '13x19 inches', '16x20 inches', 'A4', 'A3', 'A2'],
  price: [3.43, 5.52, 8.60, 0, 2.14, 1.39, 8.64, 0, 5.41, 0.64, 3.27, 1.52, 0, 0, 2.09, 0, 0],
  quantity: fake.random.number(10),
  handmade: fake.random.boolean(),
  made_to_order: fake.random.boolean(),
  materials: fake.random.boolean(),
  gift_message: fake.random.boolean(),
  gift_card: fake.random.boolean(),
  shipping_min_days: fake.random.number({ min: 0, max: 5 }),
  shipping_max_days: fake.random.number({ min: 6, max: 10 }),
  shipping_price: fake.random.number({ min: 0, max: 5 }),
};

const countriesShipping = {
  product_id: fake.random.number(10000000),
  country_id: fake.random.number({ min: 1, max: 16 }),
};

const countries = {
  country_name: fake.address.country(),
  shipping_multiplier: fake.random.number(5),
};

const feedback = {
  product_id: fake.random.number(10000000),
};

const users = {
  products_favorited: fake.random.number({ min: 1, max: 10 }),
};

const favoriteUsers = {
  product_id: fake.random.number({ min: 1, max: 10000000 }),
  user_id: fake.random.number({ min: 1, max: 100000000 }),
};

// const insertData = (callback) => {
//   const promises = [];
//   for (let i = 0; i < 17; i += 1) {
//     const queryStr = `INSERT INTO countries (country_name, shipping_multiplier) VALUES ('${fake.address.country()}', ${fake.random.number(5)})`;
//     promises.push(client.query(queryStr));
//   }
//   Promise.all(promises)
//     .then(result => callback(null, result))
//     .catch(error => callback(error, null));
// };


const insertData = (callback, counter) => {
  const keepCount = counter || 0;
  const querys = [];
  for (let i = 1000 * keepCount; i < 1000 + (1000 * keepCount); i += 1) {
    querys.push({
      product_id: fake.random.number(10000000),
      country_id: fake.random.number({ min: 1, max: 17 }),
    });
  }
  knex.batchInsert('countries_shipping', querys, 1000)
    .then((result) => {
      if (counter === 10000) {
        callback(null, result);
      } else {
        console.log(keepCount);
        insertData(callback, keepCount + 1);
      }
    })
    .catch(error => callback(error, null));
};


module.exports = {
  retrieve,
  insertData,
};
