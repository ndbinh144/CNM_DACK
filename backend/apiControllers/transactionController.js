var express = require('express');

var route = express.Router();
var trasactionRepo = require('../repos/transactionRepo.js');
dataTranscationCache = [];

route.get('/', (req, res) => {
  if (dataTranscationCache.length != 0) {
    console.log("Send data from cache");
    res.json(dataTranscationCache);
  } else {
    trasactionRepo.loadAll()
    .then(rows => {
      var len = rows.length;
      for (var i = 0; i < len; ++i) {
        dataTranscationCache.push(rows[i]);
      }
      res.json(dataTranscationCache);
    }).catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end("View error on console");
    });
  }
});

route.get('/:accountnum', (req, res) => {
  var accountNum = req.params.accountnum;
  trasactionRepo.loadByAccountNumber(accountNum)
  .then(rows => {
    res.json(rows);
  }).catch(err => {
    console.log(err);
    res.statusCode = 500;
    res.end('View error on console');
  });
});

module.exports = route;

