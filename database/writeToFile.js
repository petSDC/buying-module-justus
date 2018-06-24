const fs = require('fs');
const fake = require('faker');

const wStream = fs.createWriteStream('1DOC_products.txt');


const writeToFile = (writer) => {
  let i = 100000;
  function write() {
    let ok = true;
    do {
      i -= 1;
      if (i === 0) {
        writer.write(`'${fake.commerce.productName()}', ${fake.random.boolean()},'Sizes', '['4x6 inches', '5x7 inches', '8x10 inches', '11x14 inches', '12x16 inches', '13x19 inches', '16x20 inches', 'A4', 'A3', 'A2'], [3.43, 5.52, 8.60, 0, 2.14, 1.39, 8.64, 0, 5.41, 0.64, 3.27, 1.52, 0, 0, 2.09, 0, 0]', ${fake.random.number(10)}, ${fake.random.boolean()}, ${fake.random.boolean()}, ${fake.random.boolean()}, ${fake.random.boolean()}, ${fake.random.boolean()}, ${fake.random.number({ min: 0, max: 5 })}, ${fake.random.number({ min: 6, max: 10 })}, ${fake.random.number({ min: 0, max: 5 })}\n`);
        wStream.end();
      } else {
        if (i % 100000 === 0) {
          console.log(i);
        }
        ok = writer.write(`'${fake.commerce.productName()}', ${fake.random.boolean()},'Sizes', ['4x6 inches', '5x7 inches', '8x10 inches', '11x14 inches', '12x16 inches', '13x19 inches', '16x20 inches', 'A4', 'A3', 'A2'], [3.43, 5.52, 8.60, 0, 2.14, 1.39, 8.64, 0, 5.41, 0.64, 3.27, 1.52, 0, 0, 2.09, 0, 0], ${fake.random.number(10)}, ${fake.random.boolean()}, ${fake.random.boolean()}, ${fake.random.boolean()}, ${fake.random.boolean()}, ${fake.random.boolean()}, ${fake.random.number({ min: 0, max: 5 })}, ${fake.random.number({ min: 6, max: 10 })}, ${fake.random.number({ min: 0, max: 5 })}\n`);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

writeToFile(wStream);

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
  product_id: fake.random.number({ min: 1, max: 10000000 }),
};

const users = {
  products_favorited: fake.random.number({ min: 1, max: 10 }),
};

const favoriteUsers = {
  product_id: fake.random.number({ min: 1, max: 10000000 }),
  user_id: fake.random.number({ min: 1, max: 100000000 }),
};

const insertData = (callback) => {
  const promises = [];
  for (let i = 0; i < 17; i += 1) {
    const queryStr = `INSERT INTO countries (country_name, shipping_multiplier) VALUES ('${fake.address.country()}', ${fake.random.number(5)})`;
    promises.push(client.query(queryStr));
  }
  Promise.all(promises)
    .then(result => callback(null, result))
    .catch(error => callback(error, null));
};
