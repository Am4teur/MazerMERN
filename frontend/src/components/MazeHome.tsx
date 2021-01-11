/* create a mazer (name, seed (optional), rows and cols) [name, creator, see]
    list of my mazers
    list of recent/connected
    list of public mazers
    connect to mazer (private and public mazers)*/

import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';

import MazeList from './MazeList';
import MazeCreate from './MazeCreate';


const MazeHome = () => {
  const { userData } = useContext(UserContext);
  //var [icon, setIcon] = useState<string>(userData.user.icon);
  
  return (
    <div className="mazeHome mb-4 mt-3">
      <MazeList />
      <MazeCreate />
    </div>
  );
}

export default MazeHome;