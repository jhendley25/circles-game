import React, { Component } from 'react';
import './App.css';
import {Layer, Circle, Stage, Group} from 'react-konva';

class CircleTile extends Component {
  state = {color: 'green'}

  constructor(...args){
    super(...args);

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    console.log("CircleTile mounted");
  }

  handleClick() {
    this.setState({
      color: 'blue'
    });
  }

  render() {
    return (
      <Circle
          x={10} y={10} width={50} height={50}
          fill={this.state.color}
          shadowBlur={10}
          onClick={this.handleClick}
      />
    );
  }
}

export default CircleTile;
