import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';

class GameHeader extends Component {
  state = {}

  constructor(...args){
    super(...args);
    this.socket = this.props.socket
  }

  componentDidMount() {
    console.log("Header mounted");
    // this.setState({
    //   selectedCount: this.props.selectedCount
    // })
  }

  render() {
    return (
      <div className="App-header">
        <img src={logo} className="Header-logo" alt="logo" />
        <div className="Selection-count">
          {this.props.selectedCount}/10 selected

        </div>

      </div>

    )
  }
}

// <div className="Game-info">
//
//   currentUsersCount: {this.state.currentUsersCount}
// </div>

export default GameHeader;
