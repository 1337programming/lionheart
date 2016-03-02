var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// Add headers
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var server = require('http').createServer(app);
var io = module.exports = require('socket.io')(server);
var argv = require('yargs').argv;
var port = argv.port || 8080;

app.get('/newsfeed', function (req, res) {
  res = setPermissions(res);
  var obj = {html: null, data: null};
  var userId = null, itemId = null;
  if (req.query.userId) {
    userId = req.query.userId;
  }
  if (req.query.itemId) {
    itemId = req.query.itemId;
  }
  // TODO: return newsfeed or newsfeed item based on user or selected feed.

});

require('./mongo-config');
require('./routes')(app);
require('./socketio')(io);

server.listen(port, function() {
    console.log('Server listening on port %d', port);
});

process.on('uncaughtException', function(err) {
  console.log(err.stack);
});
