import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import io from 'socket.io-client'

const socket = io()

class GameHeader extends Component {
  state = {}

  // eslint-disable-next-line
  constructor(...args){
    super(...args);
  }

  componentDidMount() {
    console.log("Header mounted");
  }

  // The stage should contain circles 30w x 15h
  render() {
    return (
      <div className="App-header">
        <br/>
        Sockets are working yo! Server time is:
        <br/>
        {this.state.serverTime}
        <br/>
        currentUsersCount: {this.state.currentUsersCount}
      </div>

    )
  }
}

export default GameHeader;
