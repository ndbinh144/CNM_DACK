var db = require('../fn/mysql-db');

exports.loadAll = () => {
	var sql = 'select * from accountbank';
	return db.load(sql);
}