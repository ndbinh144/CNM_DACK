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

exports.getNameByAccoutNum = (accNum) => {
	var sql1 = `SELECT NAME FROM USER U, ACCOUNTBANK A `;
	var sql2 = `WHERE U.IDUSER = A.IDUSER AND A.NUMBERACCOUNT= ${accNum}`;
	var sql = sql1 + sql2;
	console.log(sql);
	return db.load(sql);
}