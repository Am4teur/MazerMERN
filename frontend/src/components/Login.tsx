import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import UserContext from '../context/UserContext';


require('dotenv').config();
const ENDPOINT = process.env.REACT_APP_ENDPOINT;

interface LoginState {
  email: string,
  password: string,
}

const Login = (state: LoginState) => {
  const history = useHistory();
  var [email, setEmail] = useState<string>("");
  var [password, setPassword] = useState<string>("");
  var [error, setError] = useState<string>("");

  var { setUserData } = useContext(UserContext);


  const onSubmit = async (e: any): Promise<void> => {
    e.preventDefault();

    try {
      const loginInfo = {
        email: email,
        password: password
      }


      const loginRes = await axios.post((ENDPOINT + 'users/login'), loginInfo);

// TODO TEST IF THIS IS NECESSARY
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
        loading: false,
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

        <div className="row">
          <div className="col mx-4">
            <label>Email</label>
            <input type="email" required className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className="col mx-4">
            <label>Password</label>
            <input type="password" required className="form-control" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div>

        <br/>
        <input type="submit" value="Login" className='btn btn-primary ml-4 my-2'/>

      </form>
    </div>
  );
}


export default Login;
