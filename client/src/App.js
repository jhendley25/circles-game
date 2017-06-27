import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'

import GameStage from './GameStage.js';

const socket = io()

class App extends Component {
  state = {}

  constructor(...args){
    super(...args);

  }

  componentDidMount() {
    socket.on("time", time => {
      console.log("time is ", time);
      this.setState({ serverTime: time })
    })
    socket.on("userCountUpdated", count => {
      console.log("count is ", count);
      this.setState({ currentUsersCount: count })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
