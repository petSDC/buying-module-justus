const data = require('../data.js');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/products');

const detailsSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  freeShipping: Boolean,
  options: {
    name: String,
    differentOptions: [String],
    price: [Number],
  },
  quantity: Number,
  handmade: Boolean,
  madeToOrder: Boolean,
  materials: String,
  giftMessage: Boolean,
  giftCard: Boolean,
  shippingCountries: [String],
  shippingPrice: [Number],
  feedback: Number,
  favoritedBy: Number,
  shippingMin: Number,
  shippingMax: Number,
  shopLocation: String,
});

const Product = mongoose.model('Product', detailsSchema);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Database connected!');
  Product.on('index', (err) => {
    if (err) {
      console.error('error while waiting for index: ', err);
    }
    Product.insertMany(data, (error) => {
      if (error) {
        console.error('error inserting data: ', error);
      }
    });
  });
});

const retrieve = (id, callback) => {
  Product.find({ id: id }, (err, docs) => {
    if (err) {
      callback(err, null);
    }
    callback(null, docs);
  });
};

module.exports = {
  retrieve,
};
