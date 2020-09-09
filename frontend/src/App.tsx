import React, { /* Component */ } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Navbar from './components/Navbar';
import Info from './components/Info';
import UserForm from './components/UserForm';
import Maze from './components/Maze';
import Footer from './components/Footer';


function App() {

  return (
    <Router>
      <Navbar />
      <Info />
      
      <Route path="/" exact component={UserForm} />
      <div className="Maze">
      <Route path="/mazer" component={Maze} />
      </div>

      <Footer />
      
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