'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const find = require('lodash.find');
const filter = require('lodash.filter');

let circleTiles = require('./lib/circle-tiles')

const PORT = process.env.PORT || 3000;

const server = express()
  .use(express.static(path.join(__dirname, 'client/build')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  var playerId;
  io.emit('circleTilesState',circleTiles)

  socket.on('disconnect', (data) => {
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

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);


function resetCirclesOnDisconnect(playerId) {
  // fix this dumb data pattern of circleTiles.circleTiles
  let playerCircles = filter(circleTiles.circleTiles, circle => circle.userId == playerId)
  console.log("playerCircles are ", playerCircles);
  playerCircles.map(circle => {
    circle.selected = false
    circle.userId = null

    io.emit(`circleUpdated:${circle.id}`, {data: circle})
  })
}

function findAndUpdateCircle(data) {
  console.log("data in findAndUpdateCircle", data);
  let circle = find(circleTiles.circleTiles, {id: data.id})

  circle.selected = data.selected
  circle.userId = data.userId

  console.log("circle after update", circle);
  io.emit(`circleUpdated:${circle.id}`, {data: circle})

}
