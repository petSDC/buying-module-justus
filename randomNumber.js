const generateRandomData = (context, events, done) => {
  const randomNumber20 = Math.floor(Math.random() * (10000000 - 8000000)) + 8000000;
  const randomNumber80 = Math.floor(Math.random() * (7999999 - 1)) + 1;

  context.vars.randomNumber20 = randomNumber20;
  context.vars.randomNumber80 = randomNumber80;

  return done();
};

module.exports = {
  generateRandomData,
};
