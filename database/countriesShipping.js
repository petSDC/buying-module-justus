const fs = require('fs');
const faker = require('faker');

const wStream = fs.createWriteStream('users2.txt');

for (let i = 0; i < 5000000; i += 1) {
  wStream.write(`${faker.random.number({ min: 1, max: 10 })}\n`);
  if (i % 10000 === 0) {
    console.log(i);
  }
}
wStream.end();
