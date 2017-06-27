import React, { Component } from 'react';
import './App.css';
import {Layer, Stage, Group} from 'react-konva';

import CircleTile from './CircleTile.js';

// should probably drop in some state management instead of doing this here...
const tileCount = Array.from({length: 15*30}, (v,i) => i)

class GameStage extends Component {
  state = {}

  constructor(...args){
    super(...args);
  }

  componentDidMount() {
    console.log("GameStage mounted");
  }
  // The stage should contain circles 30w x 15h
  render() {
    return (
      <Stage width={700} height={700}>
        <Layer>
          <CircleTile />
          <CircleTile />
          <CircleTile />
          <CircleTile />
        </Layer>
      </Stage>
    );
  }
}

export default GameStage;
