import React, { useState, useContext, useEffect, useMemo } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from 'axios';
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Maze from './components/Maze';
import Footer from './components/Footer';
import UserContext from './context/UserContext'
import User from './objects/User';



const ENDPOINT = 'http://localhost:5000/';


export default function App() {
  const {userData, setUserData, loading} = useContext(UserContext);
  /*useState({
    token: "",
    user: new User("", "", 0, 0),
    loading: true,
  });*/

  // this creates a cache because everytime we were using <UserContext.Provider value={{ userData: userData, setUserData: setUserData }}
  // it was creating a new object with the same values.
  //                                  provider data / cache of context                   when this provider Data is updated
  const providerData = useMemo(() => ({ userData: userData, setUserData: setUserData, loading: loading }), [userData, setUserData])


  useEffect(() => {
    console.log("useeffect");
    
    const checkedLoggedIn = async () => {
      if(loading) {
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
            user: new User(userRes.data.id, userRes.data.username, userRes.data.x, userRes.data.y),
          });
        }
      }
    }
    checkedLoggedIn();
  }, [userData, loading]);
  console.log("inside");
  

  if(loading) return null;
  return (
    <div className="Site">
    <BrowserRouter>
      <UserContext.Provider value={providerData}>
        <div className="Site-content">
        <Navbar/>

        <Switch>
          <Route path="/" exact component={Home} /> {/*Home*/}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/mazer" component={Maze} />
        </Switch>
        </div>

        <Footer />
      </UserContext.Provider>
    </BrowserRouter>
    </div>
  );




}
