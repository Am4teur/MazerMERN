import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';

import UserInfo from './UserInfo';
import Board from './Board';
import MazeInfo from './MazeInfo';

import io from 'socket.io-client';
import GameInfo from './GameInfo';
let socket: any;

require('dotenv').config();
let ENDPOINT = process.env.REACT_APP_ENDPOINT ? process.env.REACT_APP_ENDPOINT : "";
//let mazeOption = "5fbac485d8017b593cf11df5";
//let icon = "blue-simple-icon";


interface MazeProps {
  location: any,
}


const Maze = (props: MazeProps) => {
  const { userData } = useContext(UserContext);
  var [icon, setIcon] = useState<string>("");
  var [mazeId, setMazeId] = useState<string>("");

  useEffect(() => {
    //init socket here, only 1 socket is created because of the [ENDPOINT] is not updated
    //but <Board/> component doens't receive a socket
    socket = io(ENDPOINT);
    
    setIcon(userData.user.icon);
    setMazeId(props.location.state.mazeId);

    socket.emit('join', { userId: userData.user.id, mazeId: props.location.state.mazeId });
    
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPOINT, props.location.state.mazeId]);
  
  return (
    <div className="Maze mb-4 mt-3" style={{textAlign: "center"}}>
      { mazeId !== "" ? 
      <>
      <GameInfo />
      <Board onIconChange={(v: string): void => {setIcon(v)}} user={userData.user} mazeId={mazeId} socket={socket} iconName={icon}/>
      <MazeInfo mazeId={mazeId}/>
      <UserInfo />
      {/* <IconMenu /> */}
      </>
      : null
      }
    </div>
  );
}

export default Maze;