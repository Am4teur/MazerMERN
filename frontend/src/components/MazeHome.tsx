import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

import MazeList from './MazeList';
import { useHistory } from 'react-router-dom';
import NoAuthBtns from './NoAuthBtns';


const MazeHome = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  //var [icon, setIcon] = useState<string>(userData.user.icon);

  const routeMazeCreate = () => {
		history.push('/mazeCreate');
  }
  
  const routeMazeAdd = () => {
		history.push('/mazeAdd');
	}
  
  return (
    <div className="mazeHome mb-4 mt-3">
    {userData.user.username !== ""
    ?
    <>
      <div className="ml-4">
				<button className="btn btn-primary ml-4 my-3" onClick={routeMazeCreate}>Create a new Maze</button>
			</div>
      <div className="ml-4">
				<button className="btn btn-primary ml-4 my-3" onClick={routeMazeAdd}>Connect to existing Maze</button>
			</div>
      <MazeList />
    </>
    :
    <>
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <h1>Register or Login to solve mazes</h1>
      <NoAuthBtns />
      </div>
    </>
    }
    </div>
    
  );
}

export default MazeHome;