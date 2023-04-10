const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 3500;
const chatApp = express();

const http = require('http');
const chatHTTPServer = http.createServer(chatApp); // chatApp is a handler function supplied to HTTP server

const { Server } = require('socket.io');
// initialize new Server instance of socket.io by passing it HTTP server obj on which to mount the socket server
const io = new Server(chatHTTPServer, {
  pingTimeout: 30000, // https://socket.io/docs/v4/troubleshooting-connection-issues/#the-browser-tab-was-minimized-and-heartbeat-has-failed
});

// on connection event, listening for incoming sockets
io.on('connection', (socket) => {
  console.log('new user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected'); // refreshing chat page disconnects and reconnects socket
    //https://socket.io/docs/v4/troubleshooting-connection-issues/#problem-the-socket-gets-disconnected
  });
});

// listening on HTTP server!
chatHTTPServer.listen(PORT, () => {
  console.log(`Chat server listening on PORT: ${PORT}`);
});
