import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';

import Board from './Board';
import UserInfo from './UserInfo';


function Maze() {
  const { userData } = useContext(UserContext);
  var [icon, setIcon] = useState('');

  return (
    <div className="Maze">
      <UserInfo username={userData.user.username} icon={icon}/>
      <Board onIconChange={(v: string): void => {setIcon(v)}} user={userData.user}/>
      {/* <IconMenu /> */}
    </div>
  );
}

export default Maze;