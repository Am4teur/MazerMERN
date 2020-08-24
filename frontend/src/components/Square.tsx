import React, { Component } from 'react';
import Icon from './Icon';


interface SquareProps {
  style: any;
  icons: Icon[];
}

class Square extends Component<SquareProps, {}> {
  /*let style = {
    N: X,
    S: X,
    E: X,
    W: X,
    pieces: [],
    exit/end: boolean,
    bonus/extra/price: typeOfPrice,

  }*/

  render() {
    return (
      <div className="square" style={this.props.style}>

        {(this.props.icons.length > 0 ? this.props.icons.length : '')}
      </div>
    );
  }
}


export default Square;