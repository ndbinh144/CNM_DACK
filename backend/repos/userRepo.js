var md5 = require('crypto-js/md5');

var db = require('../fn/mysql-db');

exports.login = loginEntity => {
	// loginEntity = {
	// 	user: 'nndkhoa',
	// 	pwd: 'nndkhoa'
	// }

	// var md5_pwd = md5(loginEntity.password);
	console.log(loginEntity);
	var sql = `select * from accounts where username = '${loginEntity.username}' and password = '${loginEntity.password}'`;
	return db.load(sql);
}
