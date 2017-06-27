import React, { Component } from 'react';
import './App.css';
import {Layer, Circle, Stage, Group} from 'react-konva';

const NUMBER_OF_COLUMNS = 30

function multiplyer(tileId){
  return Math.floor(tileId / NUMBER_OF_COLUMNS)
}

class CircleTile extends Component {
  state = {color: 'green'}

  constructor(...args){
    super(...args);

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    // console.log("CircleTile mounted");
  }

  handleClick() {
    this.setState({
      color: 'blue'
    });
  }
  getXPos() {
    // looks like these things are positioned based on the center of the rendered circle, so add the radius for left-hand padding
    return ((this.props.tile.id * this.getDimensions()) + (this.getDimensions()/2)) - (this.props.stageWidth * multiplyer(this.props.tile.id))
  }
  getYPos() {
    return this.getDimensions() * multiplyer(this.props.tile.id) + this.getDimensions()/2
  }
  getDimensions() {
    // need ratio of window width to column width for proper dimensions
    return this.props.stageWidth / NUMBER_OF_COLUMNS
  }

  render() {
    return (
      <Circle
          x={this.getXPos()}
          y={this.getYPos()}
          width={this.getDimensions()}
          height={this.getDimensions()}
          fill={this.state.color}
          onClick={this.handleClick}
      />
    );
  }
}

export default CircleTile;
