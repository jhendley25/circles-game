import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client'

import uuid from "uuid";
import GameStage from './GameStage.js';


const socket = io()

class App extends Component {
  state = {}

  constructor(...args){
    super(...args);
    this.uuid = uuid()
  }

  componentDidMount() {
    // socket.on("time", time => {
    //   this.setState({ serverTime: time })
    // })
    socket.on("connect", count => {
      socket.emit('newPlayer', {id:this.uuid})
    })
  }

  render() {
    return (
      <div className="App">

        <GameStage socket={socket} uuid={this.uuid} />

      </div>
    );
  }
}

export default App;
