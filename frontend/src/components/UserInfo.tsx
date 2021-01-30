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
    <div className="userInfo d-flex flex-column justify-content-center my-4">
      <h1>User Info</h1>
      {process.env.REACT_APP_DEVELOPMENT === 'dev' && userData.user.username !== "" ?
      <>
      <h2>Username: {userData.user.username}</h2>

      <div className="row justify-content-center">
        <h2>Icon: </h2>
        <div className="mx-2 my-1">
          <IconComponent iconName={userData.user.icon} size={32}/>
        </div>
      </div>

      <h2>id: {userData.user.id}</h2>

      <h2>mazes: </h2>
      {mazeIds.map((maze: any, idx: number) => {
        return (
          <li key={idx}>
            {maze}
          </li>
        )
        })
      }
      </>
      :
      null
    }
    </div>
  );
}


export default UserInfo;