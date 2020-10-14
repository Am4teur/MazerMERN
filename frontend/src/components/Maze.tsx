import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';

import Board from './Board';
import UserInfo from './UserInfo';

import io from 'socket.io-client';
let socket: any;
let ENDPOINT = 'http://localhost:5000/';


function Maze() {
  const { userData } = useContext(UserContext);
  var [icon, setIcon] = useState('');
  socket = io(ENDPOINT);

  useEffect(() => {  
    
    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, [ENDPOINT]);

  return (
    <div className="Maze">
      <UserInfo username={userData.user.username} icon={icon}/>
      <Board onIconChange={(v: string): void => {setIcon(v)}} user={userData.user} socket={socket}/>
      {/* <IconMenu /> */}
    </div>
  );
}

export default Maze;