const { Client } = require('pg');
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
  const queryStr = `SELECT * FROM products`;
  client.query(queryStr, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const productName = [];
for (let i = 0; i < 1000; i += 1) {
  productName.push(faker.product_name);
}

const insertData = (callback) => {
  const queryStr = 'INSERT INTO products (product_name) VALUES ($)';
  client.query(queryStr, productName, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};


module.exports = {
  retrieve,
  insertData,
};
