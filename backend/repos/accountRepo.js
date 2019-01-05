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

exports.deleteAccount = (numberaccount) => {
	var sql = `delete from ${tableName} where NUMBERACCOUNT = ${numberaccount}`;
	console.log(sql);
	return db.load(sql);
}

exports.updateBalance = (numberaccount, newbalance) => {
	var sql = `update ${tableName} set balance = ${newbalance} where numberaccount = ${numberaccount}`;
	console.log(sql);
	return db.load(sql);
}

exports.getNameByNumberAccount = (numberaccount) => {
	var sql = `select name from user u, accountbank a where u.iduser = a.iduser ` + 
						`and a.numberaccount = ${numberaccount}`;
	console.log(sql);
	return db.load(sql);
}