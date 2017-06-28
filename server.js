'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const find = require('lodash.find');
const filter = require('lodash.filter');

let circleTiles = require('./lib/circle-tiles')
let userCount = 0

const PORT = process.env.PORT || 3000;

const server = express()
  .use(express.static(path.join(__dirname, 'client/build')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  var playerId;

  io.emit('circleTilesState',{circleTiles: circleTiles})

  userCount += 1
  io.emit('userCountUpdated', {userCount: userCount})

  socket.on('disconnect', (data) => {
    userCount -= 1
    io.emit('userCountUpdated', {userCount: userCount})

    console.log('Client disconnected, player was', playerId);
    resetCirclesOnDisconnect(playerId)
  });

  socket.on('newPlayer', (data) => {
    console.log('newPlayer', data);
    playerId = data.id
  });

  socket.on('circleUpdated', (data) => {
    console.log("circleUpdated, data is ", data);
    findAndUpdateCircle(data)
  })

});

function resetCirclesOnDisconnect(playerId) {
  if(!playerId) return;

  let playerCircles = filter(circleTiles, circle => circle.userId == playerId)
  console.log("playerCircles are ", playerCircles);
  playerCircles.map(circle => {
    circle.selected = false
    circle.userId = null

    io.emit(`circleUpdated:${circle.id}`, circle)
  })
}

function findAndUpdateCircle(data) {
  let circle = find(circleTiles, {id: data.id})

  circle.selected = data.selected
  circle.userId = data.userId

  io.emit(`circleUpdated:${circle.id}`, circle)
}
