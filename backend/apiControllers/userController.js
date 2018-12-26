var express = require('express');

var route = express.Router();
var userRepo = require('../repos/userRepo.js');

// Lấy danh sách các user
route.get('/', (req, res) => {
  userRepo.loadAll()
    .then(rows => {
      // Gửi kết quả về client
      res.json(rows);
    }).catch(err => {
      // Lỗi không lấy được data
      console.log(err);
      res.statusCode = 500;
      res.end('View error on console');
    });
})

// Thêm một tài khoản user
// Xóa một tài khoản user

module.exports = route;