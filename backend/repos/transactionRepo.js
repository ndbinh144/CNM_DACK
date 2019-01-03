var db = require('../fn/mysql-db');
var tableName = 'transaction'

exports.loadAll = () => {
	var sql = `select * from ${tableName}`;
	console.log(sql);
	return db.load(sql);
}

exports.loadByAccountNumber = (accountnum) => {
	var sql = `select * from ${tableName} where ACCOUNTSOURCE = ${accountnum} or ACCOUNTDESTINY = ${accountnum}`;
	console.log(sql);
	return db.load(sql);
}