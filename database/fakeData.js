const faker = require('faker');

module.exports = {
  name: faker.commerce.productName,
  freeShipping: faker.random.boolean,
  options: {
    name: "Sizes",
    differentOptions: ["4x6 inches", "5x7 inches", "8x10 inches", "11x14 inches", "12x16 inches", "13x19 inches", "16x20 inches", "A4", "A3", "A2"],
    price: [faker.finance.amount,faker.finance.amount,faker.finance.amount,faker.finance.amount,faker.finance.amount,faker.finance.amount,faker.finance.amount,faker.finance.amount,faker.finance.amount,faker.finance.amount]
  },
  quantity: faker.random.number,
  handmade: faker.random.boolean,
  madeToOrder: faker.random.boolean,
  materials: faker.random.boolean,
  giftMessage: faker.random.boolean,
  giftCard: faker.random.boolean,
  shippingCountries: JSON.stringify(["Australia", "Bulgaria", "Canada", "Denmark", "Finland", "Germany", "Iceland", "Ireland", "Liechtenstein", "Luxembourg", "Monaco", "New Zealand", "Norway", "Sweden", "Switzerland", "United Kingdom", "United States"]),
  shippingPrice: [faker.finance.amount(), faker.finance.amount(), faker.finance.amount(), faker.finance.amount(), faker.finance.amount(), faker.finance.amount(), faker.finance.ammount, faker.finance.amount, faker.finance.amount, faker.finance.amount, faker.finance.amount, faker.finance.amount, faker.finance.amount, faker.finance.amount, faker.finance.amount, faker.finance.amount],
  feedback: faker.random.number,
  favoritedBy: faker.random.number,
  shippingMin: 2,
  shippingMax: 9,
  shopLocation: faker.address.country,
};
