var express = require('express');

var route = express.Router();
var receiverRepo = require('../repos/receiverRepo.js');
var accountRepo = require('../repos/accountRepo.js');

// Tìm danh sách người nhận theo username
route.get('/:iduser', (req, res) => {
  var iduser = req.params.iduser;
  receiverRepo.loadListByIDuser(iduser)
    .then(rows => {
      res.json(rows);
    }).catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end('View error on console');
    });
});

// Thêm một người nhận vào danh sách
route.post('/', (req, res) => {
  var iduser = req.body.iduser;
  var accNum = req.body.accNum;
  var name = req.body.name;
  if (name === "") {
    accountRepo.getNameByNumberAccount(accNum)
      .then(rows => {
        var nameRs = rows[0].name;
        receiverRepo.addReceiver(iduser, accNum, nameRs)
          .then(rows2 => {
            res.json({
              status: 1
            })
          }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error on console');
            res.json({
              status: 2
            })
          });
      }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error on console');
        res.json({
          status: 2
        })
      });
  } else {
    receiverRepo.addReceiver(iduser, accNum, name)
      .then(rows => {
        res.json({
          status: 1
        })
      }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error on console');
        res.json({
          status: 2
        })
      });
  }
});

module.exports = route;