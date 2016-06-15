declare module 'socketio-jwt' {

  interface SocketioJwt {
    authorize(options:authorizeOptions):any
  }

  interface authorizeOptions {
    secret?:string;
    timeout?:number;
    handshake?:boolean;
  }

  var socketioJwt:SocketioJwt;
  export = socketioJwt
}