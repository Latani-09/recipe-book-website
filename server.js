// server/server.js
// server.js
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
const http = require('http');
const server = http.createServer((req, res) => {
  // Handle HTTP requests if needed
});

const { Server } = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Handle chat messages
  socket.on('chat message', (message) => {
    io.emit('chat message', message); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3001, () => {
  console.log('WebSocket server listening on port 3001');
});



});
