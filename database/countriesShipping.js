const fs = require('fs');
const faker = require('faker');

const wStream = fs.createWriteStream('favorited_by_users3.txt');

// for (let i = 0; i < 50000000; i += 1) {
//   //wStream.write(`${faker.random.number({ min: 1, max: 10 })}\n`);
//   if (i % 10000 === 0) {
//     console.log(i);
//   }
  
// }
// wStream.end();

function writeOneMillionTimes(writer, data, encoding, callback) {
  let i = 50000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // last time!
        writer.write(`${faker.random.number({ min: 1, max: 50000000 })},${faker.random.number({ min: 1, max: 10000000 })}\n`, encoding, callback);
        wStream.end();
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        if (i % 100000 === 0) {
          console.log(i);
        }
        ok = writer.write(`${faker.random.number({ min: 1, max: 50000000 })},${faker.random.number({ min: 1, max: 10000000 })}\n`, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}

writeOneMillionTimes(wStream);
