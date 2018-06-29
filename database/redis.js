const redis = require('redis');

const client = redis.createClient();

client.on('connect', (err) => {
  if (err) {
    console.error('failed to connect to redis');
  } else {
    console.log('connected to redis');
  }
});

const storeProduct = (key, data, callback) => {
  client.set(key, JSON.stringify(data), 'EX', 300, () => {
    callback(data);
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
