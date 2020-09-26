import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
  const [userData, setUserData] = useState({
    token: "",
    user: new User("", "", 0, 0)
  });

  useEffect(() => {
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
          user: new User(userRes.data.id, userRes.data.username, userRes.data.x, userRes.data.y)
        });
      }
    }
    checkedLoggedIn();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={ { userData: userData, setUserData: setUserData } }>
        <Navbar />

        <Switch>
          <Route path="/" exact component={Home} /> {/*Home*/}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/mazer" component={Maze} />
        </Switch>

        <Footer />
      </UserContext.Provider>
    </Router>
  );
}
