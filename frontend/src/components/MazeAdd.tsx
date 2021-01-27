import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import UserContext from '../context/UserContext';

require('dotenv').config();
const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const MazeAdd = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  var [mazeName, setMazeName] = useState<string>("");
  var [error, setError] = useState<string>();


  const onSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    
    try{
      const addUserBody = {
        userId: userData.user.id,
        mazeName: mazeName,
      }
      const maze = await axios.post(ENDPOINT + 'mazes/addUser', addUserBody);

      console.log(maze);
      
      const addMazeBody = {
        userId: userData.user.id,
        mazeId: maze.data._id
      }
      await axios.post(ENDPOINT + 'users/addMaze', addMazeBody);

      history.push({
        pathname: '/mazer',
        state: {
          mazeId: maze.data._id
        }
      });
      
    } catch(err) {
      setError(err.response.data.msg);
    }
  }
  
  return (
    <div className="mazeCreate ml-5 mr-5" style={{"color": "white"}}>
      <br/>
      <h3>Add an existing Maze to your list</h3>
      <form onSubmit={onSubmit}>
        
        {error ? <label className="form-text text-danger">{error}</label> : null}

        <div className="row mt-2">
          <div className="col mx-4">
            <label>Maze Name</label>
            <input type="text" required className="form-control" placeholder="Enter Maze Name" onChange={(e) => setMazeName(e.target.value)}/>
          </div>
        </div>

        <input type="submit" value="Add Maze" className='btn btn-primary ml-4 my-2'/>

      </form>
    </div>
  );
}

export default MazeAdd;