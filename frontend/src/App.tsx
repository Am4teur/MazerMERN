import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from 'axios';
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Maze from './components/Maze';
import Footer from './components/Footer';
import UserContext from './context/UserContext';
import User from './objects/User';
import UserInfo from './components/UserInfo';
import TempUser from './components/TempUser';



const ENDPOINT = 'http://localhost:5000/';


export default function App() {
  const [userData, setUserData] = useState({
    token: "",
    user: new User(),
    loading: true,
  });

  // this creates a cache because everytime we were using <UserContext.Provider value={{ userData: userData, setUserData: setUserData }}
  // it was creating a new object with the same values.
  //                                  provider data / cache of context                   when this provider Data is updated
  const providerData = useMemo(() => ({ userData: userData, setUserData: setUserData }), [userData, setUserData])

  useEffect(() => {
    if(userData.loading) {
      const checkedLoggedIn = async () => {
        let token = localStorage.getItem("auth-token");
        if(token === null) {
          localStorage.setItem("auth-token", "");
          token = "";
        }
        const tokenRes = await axios.post(ENDPOINT + "users/tokenIsValid", null, { headers: { "x-auth-token": token } });
        if(tokenRes.data) {
          const userRes = await axios.post(ENDPOINT + "users/get", null, { headers: { "x-auth-token": token } });

          setUserData({
            token,
            user: new User(userRes.data.id, userRes.data.username),
            loading: false,
          });
        }
        else {
          setUserData({
            token: "",
            user: new User(),
            loading: false
          });
        }

      }
      checkedLoggedIn();
    }
  }, [userData]);
  
  if(userData.loading) return null;
  return (
    <div className="Site">
    <BrowserRouter>
      <UserContext.Provider value={providerData}>
        <div className="Site-content">
        <Navbar user={userData.user}/>

        <Switch>
          <Route path="/" exact component={Home} /> {/*Home*/}
          <Route path="/temp" component={TempUser} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/mazer" component={Maze} />
          <Route path="/userInfo" component={UserInfo} />
        </Switch>
        </div>

        <Footer />
      </UserContext.Provider>
    </BrowserRouter>
    </div>
  );

}
