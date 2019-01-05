var express = require('express');

var route = express.Router();

route.get('/', (req, res) => {
  res.json('Home controller');
})
route.use('/user', require('./userController.js'));
route.use('/account', require('./accountController.js'));
route.use('/token', require('./tokenController.js'));
route.use('/transaction', require('./transactionController.js'));
route.use('/receiver', require('./receiverController.js'));

module.exports = route;