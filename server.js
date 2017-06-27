'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = express()
  .use(express.static(path.join(__dirname, 'client/build')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  io.emit('userCountUpdated',io.sockets.sockets.length)
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    io.emit('userCountUpdated',io.sockets.sockets.length)
  });

});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
