var db = require('../fn/mysql-db');
var tableName = "accountbank";

exports.loadAll = () => {
	var sql = `select * from ${tableName}`;
	console.log(sql);
	return db.load(sql);
}

exports.addAccount = (numberaccount, iduser, balance, openday) => {
	var sql = `insert into ${tableName} ` + 
		`values('${numberaccount}', '${iduser}', '${balance}', '${openday}')`;
		console.log(sql);
	return db.load(sql);
}