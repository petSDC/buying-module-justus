const redis = require('redis');

const host = process.env.REDIS_PORT_6379_TCP_ADDR || 'redis';
const port = process.env.REDIS_PORT_6379_TCP_PORT || 6379;
const client = redis.createClient(port, host);

client.on('connect', (err) => {
  if (err) {
    console.error('failed to connect to redis');
  } else {
    console.log('connected to redis');
  }
});

const storeProduct = (key, data, callback) => {
  client.set(key, JSON.stringify(data), 'EX', 400, () => {
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
