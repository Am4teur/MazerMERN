import React, { useState, useEffect } from 'react';
import './Navbar.css'; // for button with icons and text separated
import axios from 'axios';

require('dotenv').config();
const ENDPOINT = process.env.REACT_APP_ENDPOINT;


interface MazeInfoProps {
  mazeId: string,
}

const MazeInfo = (props: MazeInfoProps) => {
	var [maze, setMaze] = useState<any>();
	var [userIds, setUserIds] = useState<any>([]);

	useEffect(() => {
    axios.post(ENDPOINT + "mazes/getById", {mazeId: props.mazeId})
    .then(maze => {
      setMaze(maze.data);

      let userIds = [];
			for (var userId in maze.data.users) {
				userIds.push(userId);
			}
			setUserIds(userIds);
    });
	}, [props.mazeId]);
  
  return (
    <div className="mazeInfo d-flex flex-column justify-content-center my-4">
      <h1>Maze Info</h1>
      {process.env.REACT_APP_DEVELOPMENT === 'dev' && maze ?
      <>
      <h2>Users: </h2>
      {userIds.map((user: any, idx: number) => {
        return (
          <li key={idx}>
            {user}
          </li>
        )
        })
      }

      <h2>Name: {maze.name}</h2>

      <h2>Creator: {maze.user_creater}</h2>

      <h2>seed: {maze.seed}</h2>

      <h2>rows: {maze.rows}</h2>

      <h2>cols: {maze.cols}</h2>

      <h2>id:  {maze._id}</h2>
      </>
      :
      null
    }
    </div>
  );
}


export default MazeInfo;