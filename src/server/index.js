var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = module.exports = require('socket.io')(server);
var KeyValue = require('./key-value/key-value');
var argv = require('yargs').argv;
var port = argv.port || 8080;

require('./mongo-config');
require('./routes')(app);
require('./socketio')(io);

server.listen(port, function() {
	console.log('Server listening on port %d', port);
});
