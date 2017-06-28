import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client'

import uuid from "uuid";
import GameStage from './GameStage.js';
import GameHeader from './GameHeader.js';

const socket = io()

class App extends Component {
  state = {}

  // eslint-disable-next-line
  constructor(...args){
    super(...args);
    this.uuid = uuid()
  }

  componentDidMount() {
    // socket.on("time", time => {
    //   this.setState({ serverTime: time })
    // })
    // socket.on("userCountUpdated", count => {
    //   console.log("count is ", count);
    //   this.setState({ currentUsersCount: count })
    // })
  }

  render() {
    return (
      <div className="App">

        <GameHeader socket={socket} uuid={this.uuid} />
        <GameStage socket={socket} uuid={this.uuid} />

      </div>
    );
  }
}

export default App;
