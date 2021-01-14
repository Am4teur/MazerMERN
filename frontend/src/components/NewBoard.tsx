import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';


import User from '../objects/User';
import CSS from 'csstype';

import io from 'socket.io-client';
let socket: any;
let ENDPOINT = 'http://localhost:5000/';

interface NewBoardProps {
    seed: string;
    user: User;
}

const NewBoard = (props: NewBoardProps) => {
  const { userData } = useContext(UserContext);
  var [squares, setSquares] = useState<any[]>([1,1,1,1]);

  const rows = 2;
  const cols = 2;

  useEffect(() => {
    socket = io(ENDPOINT);
    console.log("in");
    
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPOINT]);

  console.log("out");
  

  const boardStyle: CSS.Properties = {
    display: "inline-grid",
    gridTemplateRows: "repeat(" + rows + ", 1fr)",
    gridTemplateColumns: "repeat(" + cols + ", 1fr)",
  };

  return (
    <div className="NewBoard my-2" style={{ border: "2px solid black"}}>
        {squares}
    </div>
  );
}

export default NewBoard;
