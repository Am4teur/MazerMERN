import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';

require('dotenv').config();
let ENDPOINT = process.env.REACT_APP_ENDPOINT

const MazeList = () => {
    const { userData } = useContext(UserContext);
    var [list, setList] = useState<any>([]);

    useEffect(() => {
      let token = localStorage.getItem("auth-token");
      axios.post(ENDPOINT + "users/get", null, { headers: { "x-auth-token": token } }).
        then(user => {
          let ids = {"ids": user.data.mazes};

          axios.post(ENDPOINT + "mazes/getManyById", ids).
            then(listMazes => {
              let list:string[] = [];
              listMazes.data.forEach((e: any) => {
                list.push(e.name);
              });
              setList(list);
            })
        });
    }, []);
    
    return (
        <div className="mazeList ml-5 mr-5" style={{"color": "white"}}>
          <h3>List</h3>
          {list.map(function(d :string, idx: number){
            return (<li key={idx}>{d} <button className="btn btn-primary">Connect</button> </li>)
          })}
        </div>
    );
}

export default MazeList;