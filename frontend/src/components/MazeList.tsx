import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import UserContext from '../context/UserContext';

require('dotenv').config();
let ENDPOINT = process.env.REACT_APP_ENDPOINT

const MazeList = () => {
    const { userData } = useContext(UserContext);
    const history = useHistory();
    var [list, setList] = useState<any>([]);

    useEffect(() => {
      let token = localStorage.getItem("auth-token");
      axios.post(ENDPOINT + "users/get", null, { headers: { "x-auth-token": token } }).
        then(user => {
          let ids = {"ids": user.data.mazes};

          axios.post(ENDPOINT + "mazes/getManyById", ids).
            then(listMazes => {
              setList(listMazes.data);
            })
        });
    }, []);
    
    const routeConnect = (e:any, mazeId:string) => {
        history.push({
          pathname: '/mazer',
          state: {
            mazeId: mazeId
          }
        });
    }

    return (
        <div className="mazeList mx-5 my-2" style={{"color": "white"}}>
          <h3>List</h3>
          {list.map((maze: any, idx: number) => {
            return (
              <li key={idx}>
              {maze.name} <button className="btn btn-primary" onClick={(e:any) => routeConnect(e, maze._id)}>Connect</button>
            </li>
            )
            })
          }
        </div>
    );
}

export default MazeList;