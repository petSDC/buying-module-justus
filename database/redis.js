const redis = require('redis');

const client = redis.createClient();

client.on('connect', (err) => {
  if (err) {
    console.error('failed to connect to redis');
  } else {
    console.log('connected to redis');
  }
});
