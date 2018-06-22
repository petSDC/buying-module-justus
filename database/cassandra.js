const cassandra = require('cassandra-driver');
const fake = require('faker');
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
  const query = `SELECT * from products where id = ${params}`;
  client.execute(query)
    .then(result => callback(null, result))
    .catch(error => callback(error));
};

const insertData = (callback, counter) => {
  const keepCount = counter || 0;
  const promises = [];
  for (let i = 2000 * keepCount; i < 2000 + (2000 * keepCount); i += 1) {
    const query = `INSERT INTO petsdc_buying.products (id, name, freeShipping, optionsName, differentOptions, price, quantity, handmade, madeToOrder, materials, giftMessage, giftCard, shippingCountries, shippingPrice, feedback, favoritedBy, shippingMin, shippingMax) 
                    VALUES(${i}, '${faker.name()}', ${faker.freeShipping()}, 'Sizes', 
                      ['4x6 inches', '5x7 inches', '8x10 inches', '11x14 inches', '12x16 inches', '13x19 inches', '16x20 inches', 'A4', 'A3', 'A2'],
                        [3.43, 5.52, 8.60, 0, 2.14, 1.39, 8.64, 0, 5.41, 0.64, 3.27, 1.52, 0, 0, 2.09, 0, 0],
                          ${Math.floor(Math.random() * 10)}, ${faker.handmade()}, ${faker.madeToOrder()}, ${faker.materials()}, ${faker.giftMessage()}, ${faker.giftCard()},
                            ['Australia', 'Bulgaria', 'Canada', 'Denmark', 'Finland', 'Germany', 'Iceland', 'Ireland', 'Liechtenstein', 'Luxembourg', 'Monaco', 'New Zealand', 'Norway', 'Sweden', 'Switzerland', 'United Kingdom', 'United States'],
                             [3.43, 5.52, 8.60, 0, 2.14, 1.39, 8.64, 0, 5.41, 0.64, 3.27, 1.52, 0, 0, 2.09, 0, 0],
                              ${faker.feedback()}, ${faker.favoritedBy()}, ${faker.shippingMin}, ${faker.shippingMax}
                                )`;
    promises.push(client.execute(query));
  }
  Promise.all(promises)
    .then((result) => {
      if (counter === 5000) {
        callback(null, result);
      } else {
        console.log(keepCount);
        insertData(callback, keepCount + 1);
      }
    })
    .catch(error => callback(error, null));
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
};




// const insertData = (callback, counter) => {
//   const keepCount = counter || 0;
//   const promises = [];
//   for (let i = 2000 * keepCount; i < 2000 + (2000 * keepCount); i += 1) {
//     const query = {
//       name: faker.commerce.productName(),
//       freeShipping: faker.random.boolean(),
//       options: {
//         name: "Sizes",
//         differentOptions: ["4x6 inches", "5x7 inches", "8x10 inches", "11x14 inches", "12x16 inches", "13x19 inches", "16x20 inches", "A4", "A3", "A2"],
//         price: [faker.finance.amount(),faker.finance.amount(),faker.finance.amount(),faker.finance.amount(),faker.finance.amount(),faker.finance.amount(),faker.finance.amount(),faker.finance.amount(),faker.finance.amount(),faker.finance.amount()]
//       },
//       quantity: faker.random.number(),
//       handmade: faker.random.boolean(),
//       madeToOrder: faker.random.boolean(),
//       materials: faker.random.boolean(),
//       giftMessage: faker.random.boolean(),
//       giftCard: faker.random.boolean(),
//       shippingCountries: ["Australia", "Bulgaria", "Canada", "Denmark", "Finland", "Germany", "Iceland", "Ireland", "Liechtenstein", "Luxembourg", "Monaco", "New Zealand", "Norway", "Sweden", "Switzerland", "United Kingdom", "United States"],
//       shippingPrice: [faker.finance.amount(), faker.finance.amount(), faker.finance.amount(), faker.finance.amount(), faker.finance.amount(), faker.finance.amount(), faker.finance.amount(), faker.finance.amount(), faker.finance.amount(), faker.finance.amount(), faker.finance.amount(), faker.finance.amount(), faker.finance.amount(), faker.finance.amount(), faker.finance.amount(), faker.finance.amount()],
//       feedback: faker.random.number(),
//       favoritedBy: faker.random.number(),
//       shippingMin: 2,
//       shippingMax: 9,
//       shopLocation: faker.address.country(),
//     };
//     promises.push(cassanKnex().insert(query));
//   }
//   cassanKnex().batch(promises)
//     .then((result) => {
//       if (counter === 500) {
//         callback(null, result);
//       } else {
//         console.log(keepCount)
//         insertData(callback, keepCount + 1);
//       }
//     })
//     .catch(error => callback(error, null));
// };