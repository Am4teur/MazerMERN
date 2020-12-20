import React, { useState, useEffect } from 'react';
import './Navbar.css'; // for button with icons and text separated
import axios from 'axios';
require('dotenv').config();


interface MazeInfoProps {
	show: boolean,
  mazeId: string,
}

const MazeInfo = ({show, mazeId}: MazeInfoProps) => {
	var [maze, setMaze] = useState<any>();
	var [users, setUsers] = useState<any>([]);

	useEffect(() => {
    axios.post(process.env.REACT_APP_ENDPOINT + "mazes/getById", {mazeId: mazeId}).
    then(maze => {
			let users2 = [];
			for (var userId in maze.data.users) {
				users2.push(userId+"|");
			}
			setUsers(users2);
			setMaze(maze.data);

    });
	}, []);
  
  return (
    <div className="userInfo my-4">


      {
      show === true && maze
      ?
      <>
      <div className="row justify-content-center">
        <div className="col-md-auto">
          <h2 style={{color: "white"}}>Users: {users}</h2>
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