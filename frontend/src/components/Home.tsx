import React, { useContext } from 'react';
import './Home.css';
import UserContext from '../context/UserContext';
import { useHistory } from "react-router-dom";

import maze_gif from '../imgs/v1_maze.gif';
//import maze_logo from '../imgs/maze.png';


function Home() {
  const history = useHistory();
  const { userData } = useContext(UserContext);

	const routeMazer = () => {
		history.push('/mazer');
	}

  /*const routeSolver = () => {

  }*/

  return (
    <div className="Home">

      { userData.user.username !== "" ? 
      <div className="row m-4">
        <div className="col">
          <h1>Welcome {userData.user.username}</h1>
        </div>
      </div>
      :
      null
      }

      <div className="row m-4">
        <div className="col">
          <h1>Can you solve the maze first?</h1>
          <h1>Compete against your friends!</h1>
        </div>
      </div>

      <div className="d-flex justify-content-center m-4">
        <div className="align-items-center shadow rounded bg-dark px-4 mx-2" style={{border: "2px solid black"}}>
          <div className="m-3 text-center">
            <button className="btn btn-primary" onClick={routeMazer}><i className="fas fa-play mr-2"></i> Mazer</button>
          </div>
          <img className="my-4" src={maze_gif} alt="Maze Gif" style={{height: "250px", width: "250px", border: "2px solid black", display: "block"}}></img>
        </div>

        {/*<div className="col mx-2" style={{border: "2px solid black"}}>
          <div className="my-2 text-center">
            <button className="btn btn-primary" onClick={routeSolver}><img className="mr-2" style={{height: "20px", width: "20px", marginTop: "-2px"}} src={maze_logo}></img> Solver</button>
          </div>
          <h1 className="my-4">Available soon!</h1>
        </div>*/}

      </div>

    </div>
  );
}

export default Home;