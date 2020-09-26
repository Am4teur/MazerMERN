import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import "../App.css";
import UserContext from '../context/UserContext';


let ENDPOINT = 'http://localhost:5000/';

interface LoginState {
  email: string,
  password: string,
}

const Login = (state: LoginState) => {
  const history = useHistory();
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  var { setUserData } = useContext(UserContext);


  const onSubmit = async (e: any): Promise<void> => {
    e.preventDefault();

    const loginInfo = {
      email: email,
      password: password
    }

    const loginRes = await axios.post((ENDPOINT + 'users/login'), loginInfo);

    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user
    })
    localStorage.setItem("auth-token", loginRes.data.token)

    history.push('/');
  };


  return (
    <div className="LoginForm ml-5 mr-5" style={{"color": "white"}}>
      <h3>Choose your username to play online</h3>
      <form  onSubmit={onSubmit}>

        <div className="form-group">
          <input type="email" required className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
          <small className="form-text text-muted">small text {/*If you disconnect, you lose your position.*/}</small>
        </div>
        <div className="form-group">
          <input type="password" required className="form-control" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
          <small className="form-text text-muted">This username is temporary. {/*If you disconnect, you lose your position.*/}</small>
        </div>

        <div className="form-group">
          <input type="submit" value="Login" className='btn btn-primary'/>
        </div>
      </form>
    </div>
  );
}


export default Login;
