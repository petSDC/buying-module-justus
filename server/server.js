require('newrelic');
const cluster = require('cluster');
const cCPUs = require('os').cpus().length;
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/postgreSQL');
const redis = require('../database/redis');
const path = require('path');

if (cluster.isMaster) {
  for (let i = 0; i < cCPUs; i += 1) {
    cluster.fork();
  }
  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online.`);
  });
  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died.`);
  });
} else {
  const app = express();
  const port = process.env.port || 8000;

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  app.use('/:id', express.static(path.resolve(__dirname, './../public')));

  app.listen(port, () => console.log(`Buying module listening on port ${port}!`));

  app.get('/:id/details', (req, res) => {
    redis.getProduct(req.params.id, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else if (data) {
        res.send(data);
      } else {
        db.retrieve(req.params.id, (errors, result) => {
          if (errors) {
            res.sendStatus(500);
          } else {
            redis.storeProduct(req.params.id, result, (error, results) => {
              if (error) {
                res.sendStatus(500);
              } else {
                res.send(results);
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
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });

  app.post('/:id/addProduct', (req, res) => {
    db.addProduct(req.body, (err) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });

  app.put('/:id/details', (req, res) => {
    db.updateQuantity(req.params.id, (err) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });

  app.delete('/:id/details', (req, res) => {
    db.deleteProduct(req.params.id, (err) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });
}
