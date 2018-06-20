const { Client } = require('pg');

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
}

module.exports = {
  retrieve,
};
