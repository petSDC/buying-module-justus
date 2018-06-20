const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'petsdc_buying' });

client.connect((err) => {
  if (err) {
    console.error('failed to connect to cassandra', err);
  } else {
    console.log('connected to cassandra');
  }
})

const retrieve = (params, callback) => {
  const query = 'SELECT * from petsdc_buying.products';
  client.execute(query)
    .then(result => callback(null, result))
    .catch(error => callback(error));
};

const insertData = (callback) => {
  //const query = 'I name, email FROM users WHERE key = ?';
  client.execute("INSERT INTO petsdc_buying.products (id,name) VALUES('6ab09bec-e68e-48d9-a5f8-97e6fb4c9b47', 'justus')")
    .then(result => callback(null, result))
    .catch(error => callback(error));
};

module.exports = {
  retrieve,
  insertData,
};
