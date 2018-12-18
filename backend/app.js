var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');

var usersCtrl = require('./apiControllers/userControllers');

var verifyAccessToken = require('./repos/authRepo').verifyAccessToken;

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/user/', verifyAccessToken, urlencodedParser, usersCtrl);
// app.use('/orders', verifyAccessToken, orderCtrl);

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`BookCar API is running on port ${port}`);
})