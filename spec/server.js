/* You'll need to have pg running and your Node server running
 * for these tests to pass. */

const { Pool } = require('pg');
const request = require('request'); // You might need to npm install the request module!
const expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var pool;

  beforeEach(function(done) {
    pool = new Pool({
      host: 'localhost',
      user: 'justuskovats-wildenradt',
      max: 200,
      database: 'petsdc_test',
      password: '',
      port: 5432,
    });
    
    pool.connect((err) => {
      if (err) {
        console.error('failed to connect to postgres');
      } else {
        console.log('connected to postgres');
      }
    });


    var tablename = 'messages';
    
    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    pool.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    pool.end();
  });

  it('Should insert  to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://localhost:8001/details',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          message: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];

        pool.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].text).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db

    var queryString = 'INSERT INTO messages(text, userid, roomname) VALUES (?, ?, ?)';
    var queryArgs = ['Men like you can never change!', 1, 'main'];
        // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    pool.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].text).to.equal('Men like you can never change!');
        expect(messageLog[0].roomname).to.equal('main');
        done();
      });
    });
  });
});