import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

import maze_gif from '../imgs/v1_maze.gif';


function Home() {
  const { userData } = useContext(UserContext);

  const routeOnline = () => {

  }

  const routeOffline = () => {
    
  }

  return (
    <div className="Home">
      <h1 className="my-2" style={{color: "white", textAlign: "center"}}>Can you solve the puzzle first?</h1>
      <h1 className="my-2" style={{color: "white", textAlign: "center"}}>Compete against your friends!</h1>
      <div className="buttons mt-4" style={{ display: "flex", flexDirection: "row", justifyContent: "center"}} >
        <div className="px-3">
          <button className="btn btn-primary" onClick={routeOnline}>Play Online</button>
        </div>
        {/*<div className="px-3">
          <button className="btn btn-primary" onClick={routeOffline}>Play Offline</button>
        </div>*/}
      </div>
      <img className="my-4" src={maze_gif} style={{height: "500px", width: "500px", border: "2px solid black", display: "block", marginLeft: "auto", marginRight: "auto"}} alt="Maze Gif"></img>
    </div>
  );
}

export default Home;