import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import UserContext from '../context/UserContext';

require('dotenv').config();
let ENDPOINT = process.env.REACT_APP_ENDPOINT

const MazeAdd = () => {
    const { userData } = useContext(UserContext);
    const history = useHistory();
    var [mazeId, setMazeId] = useState<string>("");
    var [error, setError] = useState<string>();


    const onSubmit = async (e: any): Promise<void> => {
        e.preventDefault();
        
        try{


          // added maze to user mazes
          const addMazeBody = {
            userId: userData.user.id,
            mazeId: mazeId
          }
          await axios.post(ENDPOINT + 'users/addMaze', addMazeBody);
    
          history.push({
            pathname: '/mazer',
            state: {
              mazeId: mazeId
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
                <label>Maze ID</label>
                <input type="text" required className="form-control" placeholder="Enter Maze ID" onChange={(e) => setMazeId(e.target.value)}/>
              </div>
            </div>
    
            <input type="submit" value="Add Maze" className='btn btn-primary ml-4 my-2'/>
    
          </form>
        </div>
    );
}

export default MazeAdd;