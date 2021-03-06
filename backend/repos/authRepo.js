
var jwt = require('jsonwebtoken');
var rndToken = require('rand-token');
var moment = require('moment');

var db = require('../fn/mysql-db');
var opts = require('../fn/opts');

exports.generateAccessToken = userEntity => {
    var payload = {
        user: userEntity,
        info: 'more info'
    }
    var token = jwt.sign(payload, opts.ACCESS_TOKEN.SECRET_KEY, {
        expiresIn: opts.ACCESS_TOKEN.LIFETIME
    });

    return token;
}

exports.verifyAccessToken = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, opts.ACCESS_TOKEN.SECRET_KEY, (err, payload) => {
            if (err) {
                res.statusCode = 401;
                res.json({
                    msg: 'INVALID TOKEN',
                    error: err
                })
            } else {
                req.token_payload = payload;
                next();
            }
        });
    } else {
        res.statusCode = 403;
        res.json({
            msg: 'NO_TOKEN'
        });
        next();
    }
}

exports.generateRefreshToken = () => {
    return rndToken.generate(opts.REFRESH_TOKEN.SIZE);
}

exports.updateRefreshToken = (userId, rfToken) => {
    return new Promise((resolve, reject) => {
        var sql = `delete from tokenuser where USERNAME = '${userId}'`;
        db.insert(sql)
            .then(value => {
                var rdt = moment().format('YYYY-MM-DD HH:mm:ss');
                sql = `insert into tokenuser values('${userId}', '${rfToken}', '${rdt}')`;
                return db.insert(sql);
            })
            .then(value => resolve(value))
            .catch(err => reject(err));
    });
}

exports.verifyRefreshToken = rfToken => {
    var sql = `select * from tokenuser where RFTOKEN = '${rfToken}'`;
    return db.load(sql);
}

exports.deleteRefreshToken = id => {
    var sql = `delete from tokenuser where USERNAME = ${id}`;
    return db.delete(sql);
}