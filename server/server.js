require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
// const db = require('../database/mongoDatabase');
const db = require('../database/postgreSQL');
const redis = require('../database/redis');
// const db = require('../database/cassandra');
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
  redis.checkRedis(req.params.id, (reply) => {
    if (reply === 1) {
      redis.getProduct(req.params.id, (err, data) => {
        if (err) {
          res.sendStatus(500);
        } else {
          res.json(data);
        }
      });
    } else {
      db.retrieve(req.params.id, (err, result) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          redis.storeProduct(req.params.id, result, (error, storeReply) => {
            if (err) {
              res.sendStatus(500);
            } else {
              res.json(storeReply);
            }
          });
        }
      });
    }
  });
});

app.post('/:id/details', (req, res) => {
  db.insertData((err) => {
    if (err) {
      console.error(err);
    } else {
      res.send('inserted data');
    }
  });
});

app.post('/:id/addFeedback', (req, res) => {
  db.addFeedback(req.params.id, (err) => {
    if (err) {
      console.error(err);
    } else {
      res.send('product added');
    }
  });
});

app.post('/:id/users', (req, res) => {
  db.updateCart((err) => {
    if (err) {
      console.error(err);
    } else {
      res.send('updated user cart');
    }
  });
});

app.put('/:id/details', (req, res) => {
  const params = {
    id: 1000000,
    name: 'Incredible Concrete Salad',
    quantity: 3,
  };
  db.updateQuantity(params, (err) => {
    if (err) {
      console.error(err);
    } else {
      res.send('updated quantity');
    }
  });
});

app.delete('/:id/details', (req, res) => {
  const params = {
    id: 1090,
    name: 'Intelligent Plastic Fish',
  };
  db.deleteProduct(params, (err) => {
    if (err) {
      console.error(err);
    } else {
      res.send('deleted product');
    }
  });
});
