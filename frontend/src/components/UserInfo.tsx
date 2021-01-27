import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import IconComponent from './IconComponent';
import './Navbar.css'; // for button with icons and text separated

import axios from 'axios';

require('dotenv').config();
const ENDPOINT = process.env.REACT_APP_ENDPOINT;


const UserInfo = () => {
  const { userData } = useContext(UserContext);
  var [mazeIds, setMazeIds] = useState<any>([]);

  useEffect(() => {
    let token = localStorage.getItem("auth-token");
    if(token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    }

    axios.post(ENDPOINT + "users/get", null, { headers: { "x-auth-token": token } })
    .then(user => {
			setMazeIds(user.data.mazes);
    });
  }, []);
  
  return (
    <div className="userInfo my-4">

      {
      process.env.REACT_APP_DEVELOPMENT === 'dev' && userData.user.username !== ""
      ?
      <>
      <div className="row justify-content-center">
        <div className="col-md-auto">
          <h2 style={{color: "white"}}>Username: {userData.user.username}</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-auto">
          <h2 style={{color: "white"}}>Icon: </h2>
        </div>
        <div className="col-md-auto my-1">
          <IconComponent iconName={userData.user.icon} size={32}/>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-auto">
          <h2 style={{color: "white"}}>id: {userData.user.id}</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-auto" style={{color: "white"}}>
        {mazeIds.map((maze: any, idx: number) => {
            return (
              <li key={idx}>
              {maze}
            </li>
            )
            })
          }
        </div>
      </div>
      </>
      :
      null
    }
    </div>
  );
}


export default UserInfo;