const express = require('express');
const bodyParser = require('body-parser');
// const db = require('../database/mongoDatabase');
// const db = require('../database/postgreSQL');
const db = require('../database/cassandra');
const path = require('path');

const app = express();
const port = process.env.port || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/:id', express.static(path.resolve(__dirname, './../public')));

app.listen(port, () => console.log(`Buying module listening on port ${port}!`));

app.get('/:id/details', (req, res) => {
  db.retrieve(req.params.id, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  });
});

app.post('/:id/details', (req, res) => {
  db.insertData((err) => {
    if (err) {
      res.sendStatus(500);
      throw err;
    } else {
      res.send('inserted data');
    }
  });
});

app.put('/:id/details', (req, res) => {
  console.log('put');
  res.send('put succeeded');
});

app.delete('/:id/details', (req, res) => {
  console.log('delete');
  res.send('delete succeeded');
});
