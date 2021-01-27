import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import UserContext from '../context/UserContext';

require('dotenv').config();
const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const MazeCreate = () => {
    const { userData } = useContext(UserContext);
    const history = useHistory();
    var [name, setName] = useState<string>("");
    var [seed, setSeed] = useState<string>(Math.floor(Math.random() * 1000000).toString(10));
    var [rows, setRows] = useState<string>("10");
    var [cols, setCols] = useState<string>("10");
    var [error, setError] = useState<string>();



    const onSubmit = async (e: any): Promise<void> => {
        e.preventDefault();
        
        try{
          //craete maze
          const createMazeBody = {
            users: userData.user.id,
            user_creater: userData.user.id,
            name: name,
            seed: seed,
            rows: rows,
            cols: rows
          }
          const newMaze = await axios.post(ENDPOINT + 'mazes/create', createMazeBody);

          // added maze to user mazes
          const addMazeBody = {
            userId: userData.user.id,
            mazeId: newMaze.data._id
          }
          await axios.post(ENDPOINT + 'users/addMaze', addMazeBody);
    
          history.push({
            pathname: '/mazer',
            state: {
              mazeId: newMaze.data._id
            }
          });

        } catch(err) {
          setError(err.response.data.msg);
        }
    }
    
    return (
        <div className="mazeCreate ml-5 mr-5" style={{"color": "white"}}>
          <br/>
          <h3>Create a new Maze</h3>
          <form onSubmit={onSubmit}>
            
            {error ? <label className="form-text text-danger">{error}</label> : null}
    
            <div className="row mt-2">
              <div className="col mx-4">
                <label>Name</label>
                <input type="text" required className="form-control" placeholder="Enter name" onChange={(e) => setName(e.target.value)}/>
              </div>
            </div>
            <div className="row my-4">
            <div className="col mx-4">
                <label>Seed number</label>
                <input type="text" className="form-control" placeholder="1 - 1 000 000" onChange={(e) => setSeed(e.target.value)}/>
                <small className="form-text text-muted">Optional, between 1 and 1 000 000</small>
              </div>
              <div className="col mx-4">
                <label>Number of Rows</label>
                <input type="text" className="form-control" placeholder="2 - 20" onChange={(e) => setRows(e.target.value)}/>
                <small className="form-text text-muted">Optional, between 2 and 20</small>
              </div>
              {/* need to fix this bug of non-square mazes
              <div className="col mx-4">
                <label>Number of Columns</label>
                <input type="text" className="form-control" placeholder="2 - 20" onChange={(e) => setCols(e.target.value)}/>
                <small className="form-text text-muted">Optional, between 2 and 20</small>
              </div>*/}
            </div>
    
            <input type="submit" value="Create Maze" className='btn btn-primary ml-4 my-2'/>
    
          </form>
        </div>
    );
}

export default MazeCreate;