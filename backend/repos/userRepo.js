var db = require('../fn/mysql-db');
var tableName = 'user'

exports.loadAll = () => {
	var sql = `select * from ${tableName}`;
	return db.load(sql);
}

exports.addUser = (iduser, password, name, phonenumber, email, type) => {
	var sql = `insert into ${tableName} ` + 
		`values('${iduser}', '${password}', '${name}', '${phonenumber}', '${email}', ${type})`;
		console.log(sql);
	return db.load(sql);
}