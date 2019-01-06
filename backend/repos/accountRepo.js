var db = require('../fn/mysql-db');
var tableName = "accountbank";

exports.loadAll = () => {
	let sql = `select * from ${tableName}`;
	console.log(sql);
	return db.load(sql);
}

exports.loadByIduser = (iduser) => {
	var sql = `select * from ${tableName} where iduser = '${iduser}'`;
	console.log(sql);
	return db.load(sql);
}

exports.loadBalanceById = (accNum) => {
	var sql = `select balance from ${tableName} where numberaccount = '${accNum}'`;
	console.log(sql);
	return db.load(sql);
}

exports.loadbyIduserAccNum = (accNum, iduser) => {
	var sql = `select * from ${tableName} where iduser = '${iduser}' and numberaccount = '${accNum}'`;
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

exports.getInfoByNumberAccount = (numberaccount) => {
	var sql = `select u.name, u.phonenumber, u.email, a.numberaccount from user u, accountbank a ` +
		`where u.iduser = a.iduser and a.numberaccount = '${numberaccount}'`;
	console.log(sql);
	return db.load(sql);
}

exports.getBalanceByAccnum = (numberaccount) => {
	var sql = `select balance from ${tableName} where numberaccount = '${numberaccount}'`;
	console.log(sql);
	return db.load(sql);
}

exports.updateBalance = (accountnum, newBalance) => {
	var sql = `update ${tableName} set balance = ${newBalance} where numberaccount = '${accountnum}'`;
	console.log(sql);
	return db.load(sql);
}

exports.getIduserbyNumAcc = (numberaccount) => {
	var sql = `select iduser from ${tableName} where numberaccount = '${numberaccount}'`;
	console.log(sql);
	return db.load(sql);
} 

exports.addMoney = (accNum, money) => {
	var sql = `UPDATE ${tableName} SET BALANCE = BALANCE + ${money} where numberaccount = '${accNum}'`;
	// var sql = `select iduser from ${tableName} where numberaccount = '${accNum}'`;
	console.log(sql);
	return db.load(sql);
} 