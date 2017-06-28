import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import { Layer, Stage } from 'react-konva';
import GameHeader from './GameHeader.js';

import CircleTile from './CircleTile.js';

const STAGE_WIDTH = window.innerWidth


class GameStage extends Component {
  state = {circleTiles: [], selectedCount:0}

  constructor(...args){
    super(...args);

    this.socket = this.props.socket
    this.uuid = this.props.uuid

    this.updateHandler = this.updateHandler.bind(this)
    this.isDisabled = this.isDisabled.bind(this)
  }

  componentDidMount() {
    this.socket.once("circleTilesState", data => {
      this.setState({ circleTiles: data.circleTiles })
    })
  }

  isDisabled(){
    return this.state.selectedCount > 9
  }

  updateHandler(increase) {
    console.log("updateHandler called");
    let count = this.state.selectedCount
    if (count + 1 <= 10 && increase){
      console.log("increase hit");
      this.setState({
        selectedCount: count += 1
      })
    } else if(this.state.selectedCount > 0 && !increase){
      this.setState({
        selectedCount: count -= 1,
        disabled: false
      })
    } else if (count + 1 > 10) {
      return
    }
  }

  // The stage should contain circles 30w x 15h
  render() {
    console.log("this.state in GameStage render", this.state);
    if (!!this.state.circleTiles.length) {
      return (
        <div>
          <GameHeader
            socket={this.socket}
            uuid={this.uuid}
            selectedCount={this.state.selectedCount}
          />

          <Stage width={STAGE_WIDTH} height={window.innerHeight}>
            <Layer>
              {this.state.circleTiles.map((tile) => {
                return <CircleTile
                  tile={tile}
                  key={tile.id}
                  uuid={this.uuid}
                  socket={this.socket}
                  stageWidth={STAGE_WIDTH}
                  isDisabled={this.isDisabled}
                  updateHandler={this.updateHandler}
                />
              })}
            </Layer>
          </Stage>

        </div>
      );

    } else {
      return (
        <div className="Loading">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      )
    }
  }
}

export default GameStage;
