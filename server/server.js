require('newrelic');
const cluster = require('cluster');
const cCPUs   = require('os').cpus().length;
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/postgreSQL');
const redis = require('../database/redis');
const path = require('path');
// require('../seedEc2Postgres')

if( cluster.isMaster ) {
  // Create a worker for each CPU
  for( var i = 0; i < cCPUs; i++ ) {
    cluster.fork();
  }

  cluster.on( 'online', function( worker ) {
    console.log( 'Worker ' + worker.process.pid + ' is online.' );
  });
  cluster.on( 'exit', function( worker, code, signal ) {
    console.log( 'worker ' + worker.process.pid + ' died.' );
  });
} else {
  const app = express();
  const port = process.env.port || 8000;
  
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  
  app.use('/:id', express.static(path.resolve(__dirname, './../public')));
  
  app.listen(port, () => console.log(`Buying module listening on port ${port}!`));
  
  app.get('/:id/details', (req, res) => {
    redis.getProduct(req.params.id, (err, data) => {
      if (data) {
        console.log('got data from redis');
        res.send(data);
      } else {
        console.log('going to postgres');
        db.retrieve(req.params.id, (errors, result) => {
          if (errors) {
            res.sendStatus(500);
          } else {
            redis.storeProduct(req.params.id, result, (results) => {
              res.send(results);
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
    db.updateQuantity(params, (err) => {
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
        console.error(err);
      } else {
        res.sendStatus(200);
      }
    });
  });
}
