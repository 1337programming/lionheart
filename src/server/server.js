var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = module.exports = require('socket.io')(server);
var KeyValue = require('./key-value/key-value');
var argv = require('yargs').argv;
var port = argv.port || 8080;
io.on('connection', function(socket) {
	socket.on('save key-value', function(keyValue) {
		KeyValue.save(keyValue, function(err, keyValue) {
			if (!err) {
				io.emit('updated key-value', keyValue)
			}
			else {
				socket.emit('update error key-value', keyValue);
			}
		});
	});
});



server.listen(port, function() {
	console.log('Server listening on port %d', port);
});