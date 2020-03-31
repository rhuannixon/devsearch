import socketio from "socket.io-client";

const socket = socketio('http://10.0.0.102:3001');

const connect = () => {
    socket.on('connection');

}

const disconnect = () => {
    if (socket.connected) {
        socket.disconnect();
    }
}

export {
    connect, disconnect
}