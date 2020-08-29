import React/*, { Component }*/ from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Navbar from './components/Navbar';
import Info from './components/Info';
import UserCreate from './components/UserCreate';
import Board from './components/Board';


function App() {

  return (
    <Router>
      <Navbar />
      <Info />
      
      <Route path="/" exact component={UserCreate} />
      <div className="Maze">
      <Route path="/mazer" component={Board} />
      </div>
    </Router>
  );
}

export default App;

/*function stepByStep() {
  console.log("stepByStep");
}

function redraw() {
  console.log("redraw");
}*/

/*       <div className="maze">
        <canvas id="myCanvas"></canvas>

        <br></br>
        <button className="btn btn-dark" onClick={stepByStep}> Step-by-step </button>
        <button className="btn btn-dark" onClick={redraw}> Redraw </button>

        <h1 id="win"></h1>
      </div> */