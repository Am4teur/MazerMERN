import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import { useHistory } from "react-router-dom";

import maze_gif from '../imgs/v1_maze.gif';
import { Height } from '@material-ui/icons';
//import maze_logo from '../imgs/maze.png';


function Home() {
  const history = useHistory();
  const { userData } = useContext(UserContext);

	const routeMazeHome = () => {
		history.push('/mazehome');
	}

  /*const routeSolver = () => {

  }*/

  return (
    <div className="Home d-flex" style={{height: "100%", width: "100%"}}>
      <div className="Primary-home-column bg-primary d-flex flex-column justify-content-center align-items-center m-4" style={{width: "70%"}}>
        { userData.user.username !== "" ?
          <div className="greeting">
            <h1>Welcome {userData.user.username}</h1>
          </div>
          : null
        }
        <h1>Can you solve the maze first?</h1>
        <h1>Compete against your friends!</h1>

        <div className="d-flex flex-column align-items-center shadow rounded bg-dark m-2" style={{border: "2px solid black"}}>
          <button className="btn btn-primary m-3" onClick={routeMazeHome}><i className="fas fa-play mr-2"></i> Mazer</button>
          <img className="m-4 " src={maze_gif} alt="Maze Gif" style={{height: "250px", width: "250px", border: "2px solid black", display: "block"}}></img>
        </div>

        {/*<div className="col mx-2" style={{border: "2px solid black"}}>
          <div className="my-2 text-center">
            <button className="btn btn-primary" onClick={routeSolver}><img className="mr-2" style={{height: "20px", width: "20px", marginTop: "-2px"}} src={maze_logo}></img> Solver</button>
          </div>
          <h1 className="my-4">Available soon!</h1>
        </div>*/}
      </div>
      <div className="Secondary-home-column bg-success my-4 mr-4" style={{width: "30%"}}>
        <div className="bg-dark rounded shadow">DATAdasddddddddddd</div>
      </div>
    </div>
  );

  return (
    <div className="Home container bg-danger mb-2" style={{width: "100%", height: "80%"}}>
      <div className="d-flex flex-column justify-content-center align-items-center m-4">
        </div>
        </div>
  );
}

export default Home;