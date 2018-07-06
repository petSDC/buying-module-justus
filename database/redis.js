const redis = require('redis');

const client = redis.createClient(6379, '52.15.217.249');

client.on('connect', (err) => {
  if (err) {
    console.error('failed to connect to redis');
  } else {
    console.log('connected to redis');
  }
});

const storeProduct = (key, data, callback) => {
  client.set(key, JSON.stringify(data), 'EX', 400, (err) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const getProduct = (key, callback) => {
  client.get(key, (err, reply) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, JSON.parse(reply));
    }
  });
};

module.exports = {
  storeProduct,
  getProduct,
};
