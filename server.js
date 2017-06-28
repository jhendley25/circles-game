'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const find = require('lodash.find');

let circleTiles = require('./lib/circle-tiles')

const PORT = process.env.PORT || 3000;

const server = express()
  .use(express.static(path.join(__dirname, 'client/build')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  io.emit('circleTilesState',circleTiles)
  // io.emit('userCountUpdated',io.sockets.sockets.length) // NOTE apparently this is busted now for some reason
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    // io.emit('userCountUpdated',io.sockets.sockets.length)
  });

  socket.on('circleUpdated', (data) => {
    console.log("circleUpdated, data is ", data);
  })

});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
