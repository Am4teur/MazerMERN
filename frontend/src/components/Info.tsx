import React, { Component } from 'react';
import arrow_keys from '../imgs/arrow_keys_grey.png';
import '../App.css';


class Info extends Component {
  render() {
    return (
      <div className="info">
        <h1>Mazer</h1>
        <h2>Complete the maze by collecting the cup <span role="img" aria-label="Cup">🏆</span></h2>
        <h3>Use your arrow keys to move <img src={arrow_keys} className="arrow_keys" width={40} height={30} alt="arrow_keys"/> </h3>
        <h3 id="color-id">Your color: </h3>
      </div>
    );
  }
}


export default Info;