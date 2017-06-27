import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import { Layer, Stage } from 'react-konva';
import CircleTile from './CircleTile.js';
import io from 'socket.io-client'

const socket = io()
const STAGE_WIDTH = window.innerWidth*0.9


class GameStage extends Component {
  state = {circleTiles: []}
  
  // useless constructor, but maybe not for long
  // eslint-disable-next-line
  constructor(...args){
    super(...args);
  }

  componentDidMount() {
    socket.once("circleTilesState", data => {
      this.setState({ circleTiles: data.circleTiles })
    })
  }

  // The stage should contain circles 30w x 15h
  render() {
    console.log("this.state in GameStage render", this.state);
    if (!!this.state.circleTiles.length) {
      return (
        <Stage width={STAGE_WIDTH} height={window.innerHeight}>
          <Layer>
            {this.state.circleTiles.map((tile) => {
              return <CircleTile tile={tile} key={tile.id} stageWidth={STAGE_WIDTH}/>
            })}
          </Layer>
        </Stage>
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
