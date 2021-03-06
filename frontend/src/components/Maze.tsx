import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from '../context/UserContext';

import UserInfo from './UserInfo';
import Board from './Board';
import MazeInfo from './MazeInfo';

import io from 'socket.io-client';
import GameInfo from './GameInfo';

require('dotenv').config();
const ENDPOINT = process.env.REACT_APP_ENDPOINT ? process.env.REACT_APP_ENDPOINT : "";
//let mazeOption = "5fbac485d8017b593cf11df5";
//let icon = "blue-simple-icon";


interface MazeProps {
  location: any,
}


const Maze = (props: MazeProps) => {
  const history = useHistory();
  const { userData } = useContext(UserContext);
  var [mazeId, setMazeId] = useState<string>("");
  var [socket, setSocket] = useState<any>("");

  useEffect(() => {
    socket = io(ENDPOINT);

    setMazeId(props.location.state ? props.location.state.mazeId : "");

    socket.emit('join', { userId: userData.user.id, mazeId: props.location.state.mazeId });

    setSocket(socket);
    
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPOINT]);

  const routeMazeHome = () => {
		history.push('/mazeHome');
	}
  
  return (
    <div className="Maze d-flex flex-column justify-content-center align-items-center mb-4 mt-3">
      { mazeId !== "" && socket ? 
      <>
      <GameInfo />
      <Board onIconChange={(v: string): void => {console.log("Called onIconChange!")}} user={userData.user} mazeId={mazeId} socket={socket}/>
      <MazeInfo mazeId={mazeId}/>
      <UserInfo />
      {/* <IconMenu /> */}
      </>
      :
      <div className="mx-5 my-2">
      <h3>Go to Maze Home to reconnect to the maze</h3>
      <div className="p-1">
        <button className="btn btn-dark" onClick={routeMazeHome}>Maze Home</button>
      </div>
      </div>
      }
    </div>
  );
}

export default Maze;