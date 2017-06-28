import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';

class GameHeader extends Component {
  state = {userCount: 1}

  constructor(...args){
    super(...args);
    this.socket = this.props.socket
    this.socket.on('userCountUpdated', (data) => {
      console.log("userCountUpdated event caught");
      this.setState(data)
    })
  }

  componentDidMount() {
    console.log("Header mounted");


  }

  render() {
    return (
      <div className="App-header">
        <img src={logo} className="Header-logo" alt="logo" />
        <div className="Selection-count">
          {this.props.selectedCount}/10 selected

        </div>

        <div className="Game-info">

          {this.state.userCount} online
        </div>
      </div>

    )
  }
}


export default GameHeader;
