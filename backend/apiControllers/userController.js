var express = require('express'),
    bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var route = express.Router();
var authRepo = require('../repos/authRepo');
var userRepo = require('../repos/userRepo.js');
var dataUserCache = [];

// Lấy danh sách các user
route.get('/', (req, res) => {
  if (dataUserCache.length != 0) {
    console.log("Send data from cache");
    res.json(dataUserCache);
  } else {
    console.log("Get new data");
    userRepo.loadAll()
      .then(rows => {
        // Gửi kết quả về client
        var len = rows.length;
        for (var i = 0; i < len; ++i) {
          dataUserCache.push(rows[i]);
        }
        res.json(dataUserCache);
      }).catch(err => {
        // Lỗi không lấy được data
        console.log(err);
        res.statusCode = 500;
        res.end('View error on console');
      });
  }
});

// Thêm một tài khoản user
route.post('/', (req, res) => {
  var iduser = req.body.iduser;
  var password = req.body.password;
  var name = req.body.name;
  var phonenumber = req.body.phonenumber;
  var email = req.body.email;
  var type = req.body.type;
  userRepo.loadAll()
    .then(rows => {
      dataUserCache = [];
      var len = rows.length;
      for (var i = 0; i < len; ++i) {
        dataUserCache.push(rows[i]);
      }
      // check tài khoản đã tồn tại
      if (checkExistUser(iduser)) {
        res.json({
          status: 2
        })
      } else {
        console.log('Có thể thêm tài khoản');
        userRepo.addUser(iduser, password, name, phonenumber, email, type)
          .then(rows => {
            dataUserCache = [];
            res.json({
              status: 1
            })
          }).catch(err => {
            res.json({
              status: 3
            })
            console.log(err);
            res.statusCode = 500;
            res.end('View error on console');
          });
      }
    }).catch(err => {
      // Lỗi không lấy được data
      console.log(err);
      res.statusCode = 500;
      res.end('View error on console');
      res.json({
        status: 3
      })
    });
});

// Lấy tên người dùng dựa vào số tài khoản
route.get('/name/:accNum', (req, res) => {
  var accNum = req.params.accNum;
  userRepo.getNameByAccoutNum(accNum)
  .then(rows => {
    res.json(rows);
  }).catch(err => {
    console.log(err);
    res.statusCode = 500;
    res.end('View error on console');
  });
});

// Yêu cầu gửi otp
route.get('/requireotp', (req, res) => {
  
});

// tìm tài khoản
route.get('/find/:iduser', (req, res) => {
  var idUser = req.params.iduser;
  userRepo.findUser(idUser)
  .then(rows => {
    res.json(rows);
  }).catch(err => {
    console.log(err);
    res.statusCode = 500;
    res.end('View error on console');
  });
});

// function
function checkExistUser(iduser) {
  var len = dataUserCache.length;
  for (var i = 0; i < len; ++i) {
    if (dataUserCache[i].IDUSER == iduser) {
      return true;
    }
  }
  return false;
}

// dang nhap
route.post('/login', urlencodedParser, (req, res) => {
	userRepo.login(req.body)
		.then(rows => {
			if (rows.length > 0) {
				var userEntity = rows[0];
				var acToken = authRepo.generateAccessToken(userEntity);
        var rfToken = authRepo.generateRefreshToken();
        console.log(rfToken);
				authRepo.updateRefreshToken(userEntity.IDUSER, rfToken)
					.then(value => {
						res.json({
							auth: true,
							user: userEntity,
							access_token: acToken,
							refresh_token: rfToken
						})
					})
					.catch(err => {
						console.log(err);
						res.statusCode = 500;
						res.end('View error log on console');
					})
			} else {
				res.json({
					auth: false
				})
			}
		})
		.catch(err => {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		})
})
module.exports = route;