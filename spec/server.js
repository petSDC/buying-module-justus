const axios = require('axios');
const { expect } = require('chai');
const postgres = require('../database/postgreSQL');
const redis = require('../database/redis');

describe('Express server', () => {
  it('Should insert from the database', (done) => {
    const product = {
      id: 100100000,
      product_name:"Justus is cool",
      option_name: 'test option name',
      different_options: ["4x6 inches", "5x7 inches", "8x10 inches", "11x14 inches", "12x16 inches", "13x19 inches", "16x20 inches", "A4", "A3", "A2"],
      price: [83.4, 175.44, 106.63, 195.38, 93.44, 14.46, 78.08, 181.18, 167.61, 160.81],
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
      shop_location: "Armenia",
    };
    axios.post('/:id/addProduct', product)
      .then(() => {
        axios.get(`/${100100000}/details`)
          .then((res) => {
            expect(res.status).to.equal(200);
          })
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
    done();
  });

  it('Should select a product from the database', (done) => {
    axios.get(`/${100100000}/details`)
      .then((res) => {
        expect(res.status).to.equal(200);
      })
      .catch(error => console.error(error));
    done();
  });

  it('Should update a product from the database', (done) => {
    axios.put(`/${100100000}/details`, { quantity: 2 })
      .then((res) => {
        expect(res.status).to.equal(200);
      })
      .catch(error => console.error(error));
    done();
  });

  it('Should delete a product from the database', (done) => {
    axios.delete(`/${100100000}/details`)
      .then((res) => {
        expect(res.status).to.equal(200);
      })
      .catch(error => console.error(error));
    done();
  });
});

describe('Postgres database', () => {
  it('Should insert a product to the postgres database', (done) => {
    const product = {
      id: 100100000,
      product_name:"Justus is very cool",
      option_name: 'test option name',
      different_options: ["4x6 inches", "5x7 inches", "8x10 inches", "11x14 inches", "12x16 inches", "13x19 inches", "16x20 inches", "A4", "A3", "A2"],
      price: [83.4, 175.44, 106.63, 195.38, 93.44, 14.46, 78.08, 181.18, 167.61, 160.81],
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
      shop_location: "Armenia",
    };
    postgres.addProduct(product, () => {
      axios.get('/100100000/details')
        .then((res) => {
          expect(res.data.rows[0].product_name).to.equal('Justus is very cool');
        })
        .catch(error => console.error(error));
    });
    done();
  });

  it('Should select a product from the database', (done) => {
    postgres.retrieve(100100000, (err, res) => {
      expect(res.data.rows[0].product_name).to.equal('Justus is very cool');
    });
    done();
  });

  it('Should update a product from the database', (done) => {
    postgres.updateQuantity({ quantity: 10, id: 100100000 }, () => {
      axios.get('/100100000/details')
        .then((response) => {
          expect(response.data.rows[0].quantity).to.equal(9);
        })
        .catch(error => console.error(error));
    });
    done();
  });

  it('Should delete a product from the database', (done) => {
    postgres.deleteProduct({ id: 100100000 }, () => {
      axios.get('/100100000/details')
        .then((res) => {
          expect(res.data.rows[0]).to.equal(undefined);
        })
        .catch(error => console.error(error));
    });
    done();
  });
});

describe('Redis database', () => {
  it('Should store a product in redis', (done) => {
    redis.storeProduct(100100000, 'Hello', () => {
      redis.getProduct(100100000, (err, res) => {
        expect(res).to.equal('Hello');
      });
    });
    done();
  });
  it('Should get a product from the redis', (done) => {
    redis.getProduct(100100000, (err, res) => {
      expect(res).to.equal('Hello');
    });
    done();
  });
});
