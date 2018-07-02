
const { Pool } = require('pg');
const { Client } = require('pg');
// const schema = require('./dockerSchema.sql')
// const knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host: 'localhost',
//     // user: 'justuskovats-wildenradt',
//     password: '',
//     database: 'petsdc_buying',
//     port: 5432,
//   },
// });

// const pool = new Client('postgresql://postgres@ec2-18-236-96-132.us-west-2.compute.amazonaws.com:5432/petsdc_buying');

const pool = new Pool({
  host: 'ec2-18-236-96-132.us-west-2.compute.amazonaws.com',
  user: 'postgres',
  password: '',
  database: 'petsdc_buying',
  port: 5432,
  max: 100,
});

pool.connect((err) => {
  if (err) {
    console.error('failed to connect to ec2', err);
  } else {
    console.log('connected to ec2');
  }
});

pool.query('copy products (product_name, free_shipping, option_name, different_options, price, quantity, handmade, made_to_order, materials, gift_message, gift_card, shipping_min_days, shipping_max_days, shipping_price) from "../data/DOC_products.txt" (delimiter(","))',(err, data) => {
  if (err) {
    console.error('failed to insert into ec2');
  } else {
    console.log('inserted', data);
  }
})