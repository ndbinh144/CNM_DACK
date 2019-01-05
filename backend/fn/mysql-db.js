var mysql = require('mysql');

var createConnection = () => {
  return mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'bank'
  });
}

exports.load = sql => {
  return new Promise((resolve, reject) => {
    var cn = createConnection();
    cn.connect();
    cn.query(sql, (err, rows, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
      cn.end();
    });
  });
}