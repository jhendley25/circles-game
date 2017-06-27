import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'

const socket = io()

class App extends Component {
  state = {}

  componentDidMount() {
    socket.on("time", time => {
      console.log("time is ", time);
      this.setState({ serverTime: time })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Sockets are working yo! Server time is:
          <br/>
          {this.state.serverTime}
        </p>
      </div>
    );
  }
}

export default App;
