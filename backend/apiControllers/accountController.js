var express = require('express');
var help = require('../help/help.js');

var route = express.Router();
var dataAccountCache = [];
var accountRepo = require('../repos/accountRepo.js');

//  Lấy danh sách số tài khoản
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

// Lấy danh sách số tài khoản theo username
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
    res.json({
      listAccountUser
    });
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
        res.json({
          listAccountUser
        });
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

// Thêm một tài khoản
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

// Tạo một số tài khoản
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

// Xóa một tài khoản
route.delete('/:numaccount', (req, res) => {
  var numAccount = req.params.numaccount;
  accountRepo.deleteAccount(numAccount)
    .then(rows => {
      dataAccountCache = [];
      res.json({
        status: 1,
        messageRequest: "Đóng tài khoản thành công"
      })
    }).catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end('View error on console');
      Response.json({
        status: 2,
        messageRequest: "Đóng tài khoản thất bại, hãy thử lại sau"
      })
    })
});

// Kiểm tra số dư tài khoản có lớn hơn 0
route.post('/checkbalance', (req, res) => {
  var numAccount = req.body.accountnumber;
  if (dataAccountCache.length != 0) {
    var len = dataAccountCache.length;
    for (var i = 0; i < len; ++i) {
      if (dataAccountCache[i].NUMBERACCOUNT === numAccount) {
        if (dataAccountCache[i].BALANCE > 0) {
          res.json({
            status: 1
          });
        } else {
          res.json({
            status: 2
          })
        }
      }
    }
  } else {
    accountRepo.loadAll()
      .then(rows => {
        var len = rows.length;
        for (var i = 0; i < len; ++i) {
          dataAccountCache.push(rows[i]);
        }
        for (var i = 0; i < len; ++i) {
          if (dataAccountCache[i].NUMBERACCOUNT === numAccount) {
            if (dataAccountCache[i].BALANCE > 0) {
              res.json({
                status: 1
              });
            } else {
              res.json({
                status: 2
              })
            }
          }
        }
      }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error on console');
        res.json({
          status: 3
        });
      });
  }
});

// Chuyển tiền từ một tài khoản qua một tài khoản
route.post('/transfers', (req, res) => {
  var numAccSource = req.body.numAccSource;
  var numAccDestiny = req.body.numAccDestiny;
  var balanceSource;
  var balanceDestiny;
  if (dataAccountCache.length != 0) {
    var len = dataAccountCache.length;
    for (var i = 0; i < len; ++i) {
      if (dataAccountCache[i].NUMBERACCOUNT === numAccSource) {
        balanceSource = dataAccountCache[i].BALANCE;
      } else if (dataAccountCache[i].NUMBERACCOUNT === numAccDestiny) {
        balanceDestiny = dataAccountCache[i].BALANCE;
      }
    }
    balanceDestiny += balanceSource;
    console.log(balanceDestiny);
    accountRepo.updateBalance(numAccDestiny, balanceDestiny)
      .then(rows => {
        accountRepo.deleteAccount(numAccSource)
        .then(rows => {
          dataAccountCache = [];
          res.json({
            status: 1
          })
        }).catch(err => {
          console.log(err);
          res.statusCode = 500;
          res.end('View error on console');
          res.json({
            status: 2
          });
        });
      }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error on console');
        res.json({
          status: 2
        });
      })
  } else {
    accountRepo.loadAll()
      .then(rows => {
        var len = rows.length;
        for (var i = 0; i < len; ++i) {
          dataAccountCache.push(rows[i]);
        }
        for (var i = 0; i < len; ++i) {
          if (dataAccountCache[i].NUMBERACCOUNT === numAccSource) {
            balanceSource = dataAccountCache[i].BALANCE;
          } else if (dataAccountCache[i].NUMBERACCOUNT === numAccDestiny) {
            balanceDestiny = dataAccountCache[i].BALANCE;
          }
        }
        balanceDestiny += balanceSource;
        console.log(balanceDestiny);
        accountRepo.updateBalance(numAccDestiny, balanceDestiny)
          .then(rows => {
           accountRepo.deleteAccount(numAccSource)
           .then(rows => {
              dataAccountCache = [];
              res.json({ status: 1 })
           }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error on console');
            res.json({
              status: 2
            });
           })
          }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error on console');
            res.json({
              status: 2
            });
          })
      }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error on console');
        res.json({
          status: 2
        });
      });
  }
});

module.exports = route;