import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import UserContext from '../context/UserContext';


require('dotenv').config();
const ENDPOINT = process.env.REACT_APP_ENDPOINT;
const GLOBAL_MAZE_ID = "5fbac485d8017b593cf11df5";
const GLOBAL_MAZE_NAME = "global";
const DEFAULT_ICON = "blue-simple-icon";

interface RegisterState {
  email: string,
  password: string,
  passwordCheck: string,
  username: string;
}

const Register = (state: RegisterState) => {
  const history = useHistory();
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [passwordCheck, setPasswordCheck] = useState("");
  var [username, setUsername] = useState("");
  var [error, setError] = useState<string>();

  var { setUserData } = useContext(UserContext);


  const onSubmit = async (e: any): Promise<void> => {
    e.preventDefault();

    try{
      //register user
      const registerUser = {
        email: email,
        password: password,
        passwordCheck: passwordCheck,
        username: username,
        mazes: [GLOBAL_MAZE_ID],
        icon: DEFAULT_ICON,
      }
      
      const newUser = await axios.post((ENDPOINT + 'users/register'), registerUser);

      //update maze with the new user in users
      const user: {userId:string, mazeId:string, y:number, x:number, option:string} = {
        userId: newUser.data._id,
        mazeId: GLOBAL_MAZE_NAME,
        y: 0,
        x: 0,
        option: "0",
      }
      axios.post(ENDPOINT + "mazes/addUser", user);

      //login user
      const loginUser = {
        email: email,
        password: password,
      }

      const loginRes = await axios.post((ENDPOINT + 'users/login'), loginUser);

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
  }


  return (
    <div className="registerForm ml-5 mr-5">
      <br/>
      <h3>Register an account</h3>
      <form onSubmit={onSubmit}>
        
        {error ? <label className="form-text text-danger">{error}</label> : null}

        <div className="row mt-2">
          <div className="col mx-4">
            <label>Email</label>
            <input type="email" required className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="col mx-4">
            <label>Username</label>
            <input type="text" required className="form-control" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
          </div>
        </div>
        <div className="row my-4">
          <div className="col mx-4">
            <label>Password</label>
            <input type="password" required className="form-control" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="col mx-4">
            <label>Password Verification</label>
            <input type="password" required className="form-control" placeholder="Enter password verification" onChange={(e) => setPasswordCheck(e.target.value)}/>
          </div>
        </div>

        <input type="submit" value="Create User" className='btn btn-primary ml-4 my-2'/>

      </form>
    </div>
  );
}


export default Register;
