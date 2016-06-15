module.exports = function(io) {
  io.use(require('socketio-jwt').authorize({
    secret: 'lionheart',
    handshake: true
  }));
  
  io.on('connection', function(socket) {
    socket.on('save key-value', function(keyValue) {
      KeyValue.save(keyValue, function(err, keyValue) {
        if (!err) {
          io.emit('updated key-value', keyValue)
        } else {
          socket.emit('update error key-value', keyValue);
        }
      });
    });
  });
};
