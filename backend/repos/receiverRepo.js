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
