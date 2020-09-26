import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import "../App.css";
import UserContext from '../context/UserContext';


let ENDPOINT = 'http://localhost:5000/';

interface RegisterState {
  email: string,
  password: string,
  passwordCheck: string,
  username: string;
}

const Register = (state: RegisterState) => {
  const history = useHistory();
  var [email, setEmail] = useState("test1@test.com");
  var [password, setPassword] = useState("t1t1t1");
  var [passwordCheck, setPasswordCheck] = useState("t1t1t1");
  var [username, setUsername] = useState("test1");

  var { setUserData } = useContext(UserContext);


  const onSubmit = async (e:  any): Promise<void> => {
    e.preventDefault();

    const registerUser = {
      email: email,
      password: password,
      passwordCheck: passwordCheck,
      username: username
    }

    await axios.post((ENDPOINT + 'users/register'), registerUser);

    const loginUser = {
      email: email,
      password: password,
    }

    const loginRes = await axios.post((ENDPOINT + 'users/login'), loginUser);

    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user
    })
    localStorage.setItem("auth-token", loginRes.data.token)

    history.push('/');
  }


  return (
    <div className="registerForm ml-5 mr-5" style={{"color": "white"}}>
      <h3>Choose your username to play online</h3>
      <form onSubmit={onSubmit}>

        <div className="form-group">
          <input type="email" required className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value="test1@test.com"/>
          <small className="form-text text-muted">small text {/*If you disconnect, you lose your position.*/}</small>
        </div>
        <div className="form-group">
          <input type="text" required className="form-control" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} value="test1"/>
          <small className="form-text text-muted">This username is temporary. {/*If you disconnect, you lose your position.*/}</small>
        </div>
        <div className="form-group">
          <input type="password" required className="form-control" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value="t1t1t1"/>
          <small className="form-text text-muted">This username is temporary. {/*If you disconnect, you lose your position.*/}</small>
        </div>
        <div className="form-group">
          <input type="password" required className="form-control" placeholder="Enter password verification" onChange={(e) => setPasswordCheck(e.target.value)} value="t1t1t1"/>
          <small className="form-text text-muted">This username is temporary. {/*If you disconnect, you lose your position.*/}</small>
        </div>


        <div className="form-group">
          <input type="submit" value="Create User" className='btn btn-primary'/>
        </div>
      </form>
    </div>
  );
}


export default Register;
