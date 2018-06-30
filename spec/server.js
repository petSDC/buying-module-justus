const { Pool } = require('pg');
const axios = require('axios');
const expect = require('chai').expect;

describe('Postgres database', () => {
  var pool;

  beforeEach((done) => {
    pool = new Pool({
      host: 'localhost',
      max: 200,
      database: 'petsdc_buying',
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
    done();


    // var tablename = 'messages';
    
    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    // pool.query('truncate ' + tablename, done);
  });

  afterEach(() => {
    pool.end();
  });

  it('Should insert from the database', (done) => {
    const product = {
      id: 10001000,
      product_name:"Justus is cool",
      option_name: 'test option name',
      different_options: ["4x6 inches", "5x7 inches", "8x10 inches", "11x14 inches", "12x16 inches", "13x19 inches", "16x20 inches", "A4", "A3", "A2"],
      price: [83.4,175.44,106.63,195.38,93.44,14.46,78.08,181.18,167.61,160.81],
      freeShipping: true,
      quantity: 10,
      handmade: false,
      made_to_order: false,
      materials: "charcoal",
      gift_message: true,
      gift_card: false,
      shipping_countries: ["Australia", "Bulgaria", "Canada", "Denmark", "Finland", "Germany", "Iceland", "Ireland", "Liechtenstein", "Luxembourg", "Monaco", "New Zealand", "Norway", "Sweden", "Switzerland", "United Kingdom", "United States"],
      shippingPrice: [3.43, 5.52, 8.60, 0, 2.14, 1.39, 8.64, 0, 5.41, 0.64, 3.27, 1.52, 0, 0, 2.09, 0, 0],
      feedback: 371,
      favorited_by: 196,
      shipping_min: 3,
      shipping_max: 5,
      shop_location: "Armenia"
    }
    axios.post('/:id/addProduct', product)
    .then((res) => {
      const selectQuery = `SELECT * from products where id=10001000'`;
      pool.query(selectQuery)
      .then((res) => {
        console.log('///////////', res.data.rows[0])
        expect(res.data.rows[0].product_name).to.equal('Justus is cool');
      })
      .catch(error => console.error(error))
    })
    .catch(error => console.error(error));
    done();
});

  it('Should select a product from the database', (done) => {
    axios.get(`/${10001000}/details`)
      .then((res) => {
        expect(res.data.rows[0].product_name).to.equal('Justus is cool');
      })
      .catch(error => console.error(error));
      done();
  });

  it('Should update a product from the database', (done) => {
    axios.put(`/${10001000}/details`)
      .then((res) => {
        
      })
  });
// var queryString = 'SELECT * FROM messages';
// var queryArgs = [];

// pool.query(queryString, queryArgs, function(err, results) {
//   // Should have one result:
//   expect(results.length).to.equal(1);

//   // TODO: If you don't have a column named text, change this test.
//   expect(results[0].text).to.equal('In mercy\'s name, three days is all I need.');

//   done();

  // it('Should output all messages from the DB', function(done) {
  //   // Let's insert a message into the db

  //   var queryString = 'INSERT INTO messages(text, userid, roomname) VALUES (?, ?, ?)';
  //   var queryArgs = ['Men like you can never change!', 1, 'main'];
  //       // TODO - The exact query string and query args to use
  //   // here depend on the schema you design, so I'll leave
  //   // them up to you. */

  //   pool.query(queryString, queryArgs, function(err) {
  //     if (err) { throw err; }

  //     // Now query the Node chat server and see if it returns
  //     // the message we just inserted:
  //     request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
  //       var messageLog = JSON.parse(body);
  //       expect(messageLog[0].text).to.equal('Men like you can never change!');
  //       expect(messageLog[0].roomname).to.equal('main');
  //       done();
  //     });
  //   });
  // });
});