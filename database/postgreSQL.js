const fake = require('faker');
const { Client } = require('pg');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    // user: 'justuskovats-wildenradt',
    password: '',
    database: 'petsdc_buying',
    port: 5432,
  },
});

const client = new Client({
  host: 'localhost',
  // user: 'justuskovats-wildenradt',
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
  const queryStr =
    `SELECT
      countries.country_name,
      countries.shipping_multiplier,
      products.*,
      (
        SELECT
          count(product_id)
        FROM
          feedback
        WHERE
          feedback.product_id = ${params}
      ) AS feedbackCount,
      (
        SELECT
          count(users.products_favorited)
        FROM
          products
          LEFT JOIN favorited_by_users ON products.id = favorited_by_users.product_id
          LEFT JOIN users ON favorited_by_users.user_id = users.id
        WHERE
          products.id = ${params}
      ) AS usersCount
    FROM
      products
      LEFT JOIN countries_shipping on products.id = countries_shipping.product_id
      LEFT JOIN countries on countries_shipping.country_id = countries.id
    WHERE
      products.id = ${params}`;
  client.query(queryStr, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const insertData = (callback, counter) => {
  const keepCount = counter || 0;
  const querys = [];
  for (let i = 1000 * keepCount; i < 1000 + (1000 * keepCount); i += 1) {
    querys.push({
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
    });
  }
  knex.batchInsert('products', querys, 1000)
    .then((result) => {
      if (counter === 100000) {
        callback(null, result);
      } else {
        console.log(keepCount);
        insertData(callback, keepCount + 1);
      }
    })
    .catch(error => callback(error, null));
};

const addFeedback = (params, callback) => {
  const query = `INSERT INTO feedback (product_id) VALUES (${params})`;
  client.query(query)
    .then(result => callback(null, result))
    .catch(error => callback(error));
};

const updateQuantity = (params, callback) => {
  const queryStr = `UPDATE products SET quantity = ${params.quantity - 1} WHERE id = ${params.id}`;
  client.query(queryStr)
    .then(result => callback(null, result))
    .catch(error => callback(error));
};

const deleteProduct = (params, callback) => {
  const queryStr = `DELETE FROM products WHERE id = ${params.id}'`;
  client.query(queryStr)
    .then(result => callback(null, result))
    .catch(error => callback(error));
};

module.exports = {
  retrieve,
  insertData,
  updateQuantity,
  deleteProduct,
  addFeedback,
};
