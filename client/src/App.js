import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client'

import GameStage from './GameStage.js';
import GameHeader from './GameHeader.js';

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
      //NOTE move the header functionality to a seperate component for much win
      <div className="App">

        <GameHeader />
        <GameStage />

      </div>
    );
  }
}

export default App;
