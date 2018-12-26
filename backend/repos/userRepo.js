var db = require('../fn/mysql-db');

exports.loadAll = () => {
	var sql = 'select * from user';
	return db.load(sql);
}