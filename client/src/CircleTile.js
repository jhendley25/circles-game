import React, { Component } from 'react';
import './App.css';
import { Circle } from 'react-konva';

const NUMBER_OF_COLUMNS = 30

function multiplyer(tileId){
  return Math.floor(tileId / NUMBER_OF_COLUMNS)
}

class CircleTile extends Component {
  state = {}
  constructor(...args){
    super(...args);

    this.socket = this.props.socket

    this.handleClick = this.handleClick.bind(this)

  }

  componentDidMount() {
    this.setInitialState()

    this.socket.on(`circleUpdated:${this.props.tile.id}`, (data) =>{
      console.log("update the circle, data is ", data);

      console.log("new color is ", this.determineUpdateColor(data));
      this.setState({
        selected: data.selected,
        userId: data.userId,
        color: this.determineUpdateColor(data)
      })
    })
  }

  determineUpdateColor(data){
    if(!data.selected) {
      return 'gray'
    } else if (data.userId === this.props.uuid) {
      return 'blue'
    }else {
      return 'green'
    }
  }


  setInitialState() {
    //since this is all based on individual sessions, no circles are owned and selected by the user at first

    this.setState({
      id: this.props.tile.id,
      userId: this.props.tile.userId,
      selected: this.props.tile.selected,
      color: this.props.tile.selected ? 'green' : 'gray'
    })
  }



  handleClick() {
    if (this.userCanSelectCircle()) {
      this.setState({
        color: 'blue',
        userId: this.props.uuid,
        selected: true
      })
    } else if (this.userCanDeselectCircle()) {
      this.setState({
        color: 'gray',
        userId: null,
        selected: false
      })
    }


    this.socket.emit('circleUpdated', this.state)

  }

  userCanSelectCircle() {
    return !this.state.selected
  }

  userCanDeselectCircle() {
    return this.state.selected && this.props.uuid === this.state.userId
  }

  getXPos() {
    // looks like these things are positioned based on the center of the rendered circle
    // so add the radius for left-hand padding and use the multiplyer to shift rows appropriately
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
