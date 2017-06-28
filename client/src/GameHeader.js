import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';

class GameHeader extends Component {
  state = {}

  // eslint-disable-next-line
  constructor(...args){
    super(...args);
    this.socket = this.props.socket
  }

  componentDidMount() {
    console.log("Header mounted");
  }

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
