import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client'

import GameStage from './GameStage.js';

const socket = io()

class App extends Component {
  state = {}

  // eslint-disable-next-line
  constructor(...args){
    super(...args);
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
        <div className="App-header">
          <br/>
          Sockets are working yo! Server time is:
          <br/>
          {this.state.serverTime}
          <br/>
          currentUsersCount: {this.state.currentUsersCount}
        </div>

        <GameStage />

      </div>
    );
  }
}

export default App;
