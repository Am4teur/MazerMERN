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
  var [email, setEmail] = useState<string>("");
  var [password, setPassword] = useState<string>("");
  var [error, setError] = useState<string>();

  var { setUserData } = useContext(UserContext);


  const onSubmit = async (e: any): Promise<void> => {
    e.preventDefault();

    try {
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
    } catch(err) {      
      setError(err.response.data.msg);
    }
  };


  return (
    <div className="LoginForm ml-5 mr-5" style={{"color": "white"}}>
      <br/>
      <h3>Login to an account</h3>
      <form  onSubmit={onSubmit}>

        {error ? <label className="form-text text-danger">{error}</label> : null}

        <div className="form-row">
          <div className="col">
            <label>Email</label>
            <input type="email" required className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className="col">
            <label>Password</label>
            <input type="password" required className="form-control" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div>

        <br/>
        <input type="submit" value="Login" className='btn btn-primary'/>

      </form>
    </div>
  );
}


export default Login;
