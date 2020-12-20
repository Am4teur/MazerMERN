import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';

import UserInfo from './UserInfo';
import Board from './Board';

import io from 'socket.io-client';
let socket: any;
let ENDPOINT = 'http://localhost:5000/';
let mazeOption = "5fbac485d8017b593cf11df5";
//let icon = "blue-simple-icon";


const Maze = () => {
  const { userData } = useContext(UserContext);
  var [icon, setIcon] = useState<string>("");
  socket = io(ENDPOINT);


  useEffect(() => {
    //init socket here, only 1 socket is created because of the [ENDPOINT] is not updated
    //but <Board/> component doens't receive a socket
    //socket = io(ENDPOINT);

    setIcon("blue-simple-icon");
    
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPOINT]);
  
  return (
    <div className="Maze mb-4 mt-3" style={{textAlign: "center"}}>
      <UserInfo icon={icon}/>
      <Board onIconChange={(v: string): void => {setIcon(v)}} user={userData.user} mazeId={mazeOption} socket={socket} iconName={icon}/>
      {/* <IconMenu /> */}
    </div>
  );
}

export default Maze;