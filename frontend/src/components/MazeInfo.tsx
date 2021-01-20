import React, { useState, useEffect } from 'react';
import './Navbar.css'; // for button with icons and text separated
import axios from 'axios';
require('dotenv').config();


interface MazeInfoProps {
  mazeId: string,
}

const MazeInfo = (props: MazeInfoProps) => {
	var [maze, setMaze] = useState<any>();
	var [userIds, setUserIds] = useState<any>([]);

	useEffect(() => {
    axios.post(process.env.REACT_APP_ENDPOINT + "mazes/getById", {mazeId: props.mazeId})
    .then(maze => {
      setMaze(maze.data);

      let userIds = [];
			for (var userId in maze.data.users) {
				userIds.push(userId+"|");
			}
			setUserIds(userIds);
    });
	}, [props.mazeId]);
  
  return (
    <div className="mazeInfo my-4">


      {
      process.env.REACT_APP_DEVELOPMENT === 'dev' && maze
      ?
      <>
      <div className="row justify-content-center">
        <div className="col-md-auto">
          <h2 style={{color: "white"}}>Users: {userIds}</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-auto">
					<h2 style={{color: "white"}}>Name: {maze.name}</h2>
        </div>
      </div>
			<div className="row justify-content-center">
        <div className="col-md-auto">
          <h2 style={{color: "white"}}>Creator: {maze.user_creater}</h2>
        </div>
      </div>
			<div className="row justify-content-center">
        <div className="col-md-auto">
          <h2 style={{color: "white"}}>seed: {maze.seed}</h2>
        </div>
      </div>
			<div className="row justify-content-center">
        <div className="col-md-auto">
          <h2 style={{color: "white"}}>rows: {maze.rows}</h2>
        </div>
      </div>
			<div className="row justify-content-center">
        <div className="col-md-auto">
          <h2 style={{color: "white"}}>cols: {maze.cols}</h2>
        </div>
      </div>
			<div className="row justify-content-center">
        <div className="col-md-auto">
          <h2 style={{color: "white"}}>id:  {maze._id}</h2>
        </div>
      </div>
      </>
      :
      null
    }
    </div>
  );
}


export default MazeInfo;