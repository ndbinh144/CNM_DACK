var express = require('express');

var route = express.Router();
var transactionRepo = require('../repos/transactionRepo.js');
var receiverRepo = require('../repos/receiverRepo.js');
var accountRepo = require('../repos/accountRepo.js');
var help = require('../help/help.js');
dataTranscationCache = [];

route.get('/', (req, res) => {
  if (dataTranscationCache.length != 0) {
    console.log("Send data from cache");
    res.json(dataTranscationCache);
  } else {
    transactionRepo.loadAll()
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

// Thêm một giao dịch mới
route.post('/', (req, res) => {
  var accSource = req.body.accSource;
  var accDestiny = req.body.accDestiny;
  var amount = req.body.amount;
  var content = req.body.content;

  // Check nếu danh sách nhận chưa có account này thì thêm vào
  accountRepo.getIduserbyNumAcc(accSource)
  .then(rows => {
    receiverRepo.loadListByIDuser(rows[0].iduser)
    .then(rows2 => {
      var len = rows2.length;
      var dem = 0;
      for (var i = 0; i < len; ++i) {
        if (rows2[i].numberaccount != accDestiny) {
          dem++;
        }
      }
      if (dem === len) {
        accountRepo.getNameByNumberAccount(accDestiny)
        .then(rows3 => {
          receiverRepo.addReceiver(rows[0].iduser, accDestiny, rows3[0].name);
        })
      }
    })
  });

  var time = help.formatDate(new Date());
  transactionRepo.addTransaction(accSource, accDestiny, amount, content, time)
  .then(rows => {
    accountRepo.getBalanceByAccnum(accSource)
    .then(rows2 => {
      accountRepo.getBalanceByAccnum(accDestiny)
      .then(rows3 => {
        newBalanceSource = rows2[0].balance - amount;
        newBalanceDestiny = rows3[0].balance + amount;
        accountRepo.updateBalance(accSource, newBalanceSource)
        .then(rows4 => {
          accountRepo.updateBalance(accDestiny, newBalanceDestiny)
          .then(rows5 => {
            res.json({
              status: 1
            })
          })
        })
      })
    })
  }).catch(err => {
    console.log(err);
    res.statusCode = 500;
    res.end('View error on console');
  });
});

route.get('/:accountnum', (req, res) => {
  var accountNum = req.params.accountnum;
  transactionRepo.loadByAccountNumber(accountNum)
  .then(rows => {
    res.json(rows);
  }).catch(err => {
    console.log(err);
    res.statusCode = 500;
    res.end('View error on console');
  });
});

module.exports = route;

