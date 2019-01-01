var express = require('express');
var help = require('../help/help.js');

var route = express.Router();
var dataAccountCache = [];
var accountRepo = require('../repos/accountRepo.js');

route.get('/', (req, res) => {
  if (dataAccountCache.length != 0) {
    console.log("send data from cache");
    res.json(dataAccountCache);
  } else {
    accountRepo.loadAll()
      .then(rows => {
        var len = rows.length;
        for (var i = 0; i < len; ++i) {
          dataAccountCache.push(rows[i]);
        }
        console.log("get new data");
        res.json(dataAccountCache);
      }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error on console');
      })
  }
});

route.get('/:iduser', (req, res) => {
  var iduser = req.params.iduser;
  var listAccountUser = [];
  if (dataAccountCache.length != 0) {
    var len = dataAccountCache.length;
    for (var i = 0; i < len; ++i) {
      if (dataAccountCache[i].IDUSER === iduser) {
        listAccountUser.push(dataAccountCache[i]);
      }
    }
    res.json({ listAccountUser });
  } else {
    accountRepo.loadAll()
      .then(rows => {
        var len = rows.length;
        for (var i = 0; i < len; ++i) {
          dataAccountCache.push(rows[i]);
        }
        for (var i = 0; i < len; ++i) {
          if (dataAccountCache[i].IDUSER === iduser) {
            listAccountUser.push(dataAccountCache[i]);
          }
        }
        res.json({ listAccountUser });
      }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end("View error on console");
        res.json({
          listAccountUser: null
        });
      });
  }
});

route.post('/', (req, res) => {
  var numberaccount = req.body.numberaccount;
  var iduser = req.body.iduser;
  var balance = req.body.balance;
  var openday = help.formatDate(new Date());
  accountRepo.addAccount(numberaccount, iduser, balance, openday)
    .then(rows => {
      dataAccountCache = [];
      res.json({
        status: 1
      });
    }).catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end('View error on console');
      res.json({
        status: 2
      });
    });
});

route.get('/createAccountNum', (req, res) => {
  dataAccountCache = [];
  accountRepo.loadAll()
    .then(rows => {
      var len = rows.length;
      for (var i = 0; i < len; ++i) {
        dataAccountCache.push(rows[i]);
      }
      while (1) {
        var numAccountString = help.createNumberAccount();
        if (help.checkNumAccExists(numAccountString, dataAccountCache) == false) {
          res.json({
            numAccountString: numAccountString
          });
          break;
        }
      }
    }).catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end('View error on console');
      res.json({
        numAccountString: null
      });
    })
});

module.exports = route;