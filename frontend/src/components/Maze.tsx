import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';

import UserInfo from './UserInfo';
import Board from './Board';

import io from 'socket.io-client';
let socket: any;
let ENDPOINT = 'http://localhost:5000/';


const Maze = () => {
  const { userData } = useContext(UserContext);
  var [icon, setIcon] = useState<string>("");
  socket = io(ENDPOINT);


  useEffect(() => {
    //init socket here, only 1 socket is created because of the [ENDPOINT] is not updated
    //but <Board/> component doens't receive a socket
    //socket = io(ENDPOINT);
    
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPOINT]);
  
  return (
    <div className="Maze mb-5 mt-3" style={{textAlign: "center"}}>
      <UserInfo icon={icon}/>
      <Board onIconChange={(v: string): void => {setIcon(v)}} user={userData.user} socket={socket}/>
      {/* <IconMenu /> */}
    </div>
  );
}

export default Maze;