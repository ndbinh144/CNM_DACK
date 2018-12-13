var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');

var usersCtrl = require('./apiControllers/userControllers');

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        msg: 'hello from nodejs express api'
    })
});

app.use('/api/user/', urlencodedParser, usersCtrl);

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`BookCar API is running on port ${port}`);
})