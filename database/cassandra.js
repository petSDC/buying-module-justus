const cassandra = require('cassandra-driver');
const faker = require('faker');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'petsdc_buying' });

client.connect((err) => {
  if (err) {
    console.error('failed to connect to cassandra', err);
  } else {
    console.log('connected to cassandra');
  }
});

const retrieve = (params, callback) => {
  const query = `SELECT * from products where id = ${params} allow filtering`;
  client.execute(query)
    .then(result => callback(null, result))
    .catch(error => callback(error));
};

const insertData = (callback, counter) => {
  const keepCount = counter || 0;
  const promises = [];
  for (let i = 2000 * keepCount; i < 2000 + (2000 * keepCount); i += 1) {
    const query = `INSERT INTO petsdc_buying.products (id, name, freeShipping, optionsName, differentOptions, price, quantity, handmade, madeToOrder, materials, giftMessage, giftCard, shippingCountries, shippingPrice, feedback, favoritedBy, shippingMin, shippingMax) 
                    VALUES(${i}, '${faker.commerce.productName()}', ${faker.ramdom.boolean()}, 'Sizes', 
                      ['4x6 inches', '5x7 inches', '8x10 inches', '11x14 inches', '12x16 inches', '13x19 inches', '16x20 inches', 'A4', 'A3', 'A2'],
                        [3.43, 5.52, 8.60, 0, 2.14, 1.39, 8.64, 0, 5.41, 0.64, 3.27, 1.52, 0, 0, 2.09, 0, 0],
                          ${Math.floor(Math.random() * 10)}, ${faker.ramdom.boolean()}, ${faker.ramdom.boolean()}, ${faker.ramdom.boolean()}, ${faker.ramdom.boolean()}, ${faker.ramdom.boolean()},
                            ['Australia', 'Bulgaria', 'Canada', 'Denmark', 'Finland', 'Germany', 'Iceland', 'Ireland', 'Liechtenstein', 'Luxembourg', 'Monaco', 'New Zealand', 'Norway', 'Sweden', 'Switzerland', 'United Kingdom', 'United States'],
                             [3.43, 5.52, 8.60, 0, 2.14, 1.39, 8.64, 0, 5.41, 0.64, 3.27, 1.52, 0, 0, 2.09, 0, 0],
                              ${faker.ramdom.boolean()}, ${faker.random.number({ min: 1, max: 1000 })}, ${faker.random.number({ min: 1, max: 5 })}, ${faker.random.number({ min: 5, max: 10 })}
                                )`;
    promises.push(client.execute(query));
  }
  Promise.all(promises)
    .then((result) => {
      if (counter === 5000) {
        callback(null, result);
      } else {
        insertData(callback, keepCount + 1);
      }
    })
    .catch(error => callback(error, null));
};

const addFeedback = (params, callback) => {
  const query = `INSERT INTO petsdc_buying.products (id, name, freeShipping, optionsName, differentOptions, price, quantity, handmade, madeToOrder, materials, giftMessage, giftCard, shippingCountries, shippingPrice, feedback, favoritedBy, shippingMin, shippingMax) 
                  VALUES(${12000000}, 'justus', ${faker.freeShipping()}, 'Sizes', 
                    ['4x6 inches', '5x7 inches', '8x10 inches', '11x14 inches', '12x16 inches', '13x19 inches', '16x20 inches', 'A4', 'A3', 'A2'],
                      [3.43, 5.52, 8.60, 0, 2.14, 1.39, 8.64, 0, 5.41, 0.64, 3.27, 1.52, 0, 0, 2.09, 0, 0],
                        ${Math.floor(Math.random() * 10)}, ${faker.ramdom.boolean()}, ${faker.ramdom.boolean()}, ${faker.ramdom.boolean()}, ${faker.ramdom.boolean()}, ${faker.ramdom.boolean()},
                          ['Australia', 'Bulgaria', 'Canada', 'Denmark', 'Finland', 'Germany', 'Iceland', 'Ireland', 'Liechtenstein', 'Luxembourg', 'Monaco', 'New Zealand', 'Norway', 'Sweden', 'Switzerland', 'United Kingdom', 'United States'],
                            [3.43, 5.52, 8.60, 0, 2.14, 1.39, 8.64, 0, 5.41, 0.64, 3.27, 1.52, 0, 0, 2.09, 0, 0],
                              ${faker.ramdom.boolean()}, ${faker.random.number({ min: 1, max: 1000 })}, ${faker.random.number({ min: 1, max: 5 })}, ${faker.random.number({ min: 5, max: 10 })}
                                 )`;
  client.execute(query)
    .then(result => callback(null, result))
    .catch(error => callback(error));
};

const updateQuantity = (params, callback) => {
  const query = `UPDATE products SET quantity = ${params.quantity - 1} WHERE id = ${params.id} AND name = '${params.name}'`;
  client.execute(query)
    .then(result => callback(null, result))
    .catch(error => callback(error));
};

const deleteProduct = (params, callback) => {
  const query = `DELETE FROM products WHERE id = ${params.id} AND name = '${params.name}'`;
  client.execute(query)
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
