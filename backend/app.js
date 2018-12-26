var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors'),
    http = require('http'),
    socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

var indexController = require('./apiControllers/indexController.js');
app.get('/', (req, res) => {
  res.json('Welcome to Home SPA Internet Banking API');
})
app.use('/api', indexController);

io.on('connection', socket => {
  // Xu ly socket
});

var port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`SPA Internet Banking API is running on port ${port}`);
    console.log(`Socket is running on port ${port}`);
})