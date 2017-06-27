import React, { Component } from 'react';
import './App.css';
import {Layer, Rect, Stage, Group} from 'react-konva';

class MyRect extends Component {
  state = {color: 'green'}

  constructor(...args){
    super(...args);

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    console.log("MyRect mounted");
  }

  handleClick() {
      this.setState({
        color: 'blue'
      });
    }

  render() {
    return (
      <Stage width={700} height={700}>
        <Layer>
          <Rect
              x={10} y={10} width={50} height={50}
              fill={this.state.color}
              shadowBlur={10}
              onClick={this.handleClick}
          />
        </Layer>
      </Stage>
    );
  }
}

export default MyRect;
