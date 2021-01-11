/*  (DONE) create a mazer (name, seed (optional), rows and cols) [name, creator, see]
    (DONE) list of my mazers
    list of recent/connected
    list of public mazers
    connect to mazer (private and public mazers)*/

import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';

import MazeList from './MazeList';
import MazeCreate from './MazeCreate';
import { useHistory } from 'react-router-dom';


const MazeHome = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  //var [icon, setIcon] = useState<string>(userData.user.icon);

  const routeMazeCreate = () => {
		history.push('/mazeCreate');
	}
  
  return (
    <div className="mazeHome mb-4 mt-3">
      <div className="ml-4">
				<button className="btn btn-primary ml-4 my-3" onClick={routeMazeCreate}>+</button>
			</div>
      <MazeList />
    </div>
  );
}

export default MazeHome;