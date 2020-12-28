const auth = require('./authRoute');
const product = require('./productRoute');
const route = (app) => {
  app.use('/api/auth', auth);
  app.use('/api/product', product);
};
module.exports = { route };
