let SocketioJwt = require('socketio-jwt');

export default function (io) {
  io.use(SocketioJwt.authorize({
    secret: 'lionheart',
    handshake: true
  }));

  io.on('connection', (socket) => {
    socket.on('save key-value', (keyValue) => {
      keyValue.save(keyValue, (err, keyValue) => {
        if (!err) {
          io.emit('updated key-value', keyValue)
        } else {
          socket.emit('update error key-value', keyValue);
        }
      });
    });
  });

}