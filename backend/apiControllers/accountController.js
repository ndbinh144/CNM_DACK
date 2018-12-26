var express = require('express');

var route = express.Router();
var accountRepo = require('../repos/accountRepo.js');

route.get('/', (req, res) => {
  accountRepo.loadAll()
    .then(rows => {
      res.json(rows);
    }).catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end('View error on console');
    })
})

module.exports = route;