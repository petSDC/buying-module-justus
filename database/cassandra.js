const cassandra = require('cassandra-driver');
const cassanKnex = require('cassanknex');
const faker = require('./fakeData');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'petsdc_buying' });

client.connect((err) => {
  if (err) {
    console.error('failed to connect to cassandra', err);
  } else {
    console.log('connected to cassandra');
  }
});

const retrieve = (params, callback) => {
  const query = "SELECT * from products where id = 10000";
  client.execute(query)
    .then(result => callback(null, result))
    .catch(error => callback(error));
};

const insertData = (callback, counter) => {
  const keepCount = counter || 0;
  const promises = [];
  for (let i = 2000 * keepCount; i < 2000 + (2000 * keepCount); i += 1) {
    const query = `INSERT INTO petsdc_buying.products (id, name, freeShipping, quantity, handmade, madeToOrder, materials, giftMessage, giftCard, shippingCountries, feedback, favoritedBy, shippingMin, shippingMax) VALUES(${i}, '${faker.name()}', '${faker.freeShipping()}', ${faker.quantity()}, '${faker.handmade()}', '${faker.madeToOrder()}', '${faker.materials()}', '${faker.giftMessage()}', '${faker.giftCard()}', '${faker.shippingCountries}', ${faker.feedback()}, ${faker.favoritedBy()}, ${faker.shippingMin}, ${faker.shippingMax})`;
    promises.push(query);
  }
  Promise.all(promises)
    .then((result) => {
      if (counter === 500) {
        callback(null, result);
      } else {
        console.log(keepCount)
        insertData(callback, keepCount + 1);
      }
    })
    .catch(error => callback(error, null));
};

module.exports = {
  retrieve,
  insertData,
};
