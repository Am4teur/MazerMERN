import React, { useState } from 'react';

import Board from './Board';
import UserInfo from './UserInfo';


function Maze() {
  var [icon, setIcon] = useState('');
  var [username, setUsername] = useState('');

  return (
    <div className="Maze">
      <UserInfo username={username} icon={icon}/>
      <Board onIconChange={(v: string): void => {setIcon(v)}} onUsernameChange={(v: string): void => {setUsername(v)}}/>
      {/* <IconMenu /> */}
    </div>
  );
}

export default Maze;