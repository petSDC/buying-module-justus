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
  client.set(key, JSON.stringify(data), (err, reply) => {
    if (err) {
      console.error('failed to store data redis', err);
      callback(err, null);
    } else {
      console.log('stored product redis', reply);
      callback(null, data);
    }
  });
};

const getProduct = (key, callback) => {
  client.get(key, (err, reply) => {
    if (err) {
      console.error('failed to get data redis', err);
      callback(err, null);
    } else {
      console.log('got data from redis');
      callback(null, JSON.parse(reply));
    }
  });
};

const checkRedis = (key, callback) => {
  client.exists(key, (err, reply) => {
    if (err) {
      console.error('failed to check redis', err);
    } else {
      callback(reply);
    }
  });
};

module.exports = {
  checkRedis,
  storeProduct,
  getProduct,
};
