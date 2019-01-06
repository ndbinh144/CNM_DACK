var db = require('../fn/mysql-db');
var tableName = "listreceiver";

exports.loadListByIDuser = (iduser) => {
	var sql = `select * from ${tableName} where IDUSER = '${iduser}'`;
	console.log(sql);
	return db.load(sql);
}

exports.addReceiver = (iduser, accNum, name) => {
  var sql = `insert into ${tableName} values('${iduser}', '${accNum}', '${name}')`;
	console.log(sql);
	return db.load(sql);
}

exports.deleteReceiver = (numberaccount) => {
	var sql = `delete from ${tableName} where numberaccount = '${numberaccount}'`;
	console.log(sql);
	return db.load(sql);
}

exports.updateReceiver = (numberaccount, name) => {
	var sql = `update ${tableName} set name = '${name}' where numberaccount = '${numberaccount}'`;
	console.log(sql);
	return db.load(sql);
}
