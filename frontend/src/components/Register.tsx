import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import "../App.css";
import UserContext from '../context/UserContext';


let ENDPOINT = 'http://localhost:5000/';
const GLOBAL_MAZE_ID = "5fb5a857fa924d4f0c61b7fe";

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
      //const mazeRes = await axios.post((ENDPOINT + "mazes/getById"), {id: GLOBAL_ID});

      const registerUser = {
        email: email,
        password: password,
        passwordCheck: passwordCheck,
        username: username,
        mazes: [GLOBAL_MAZE_ID]
      }
      
      const newUser = await axios.post((ENDPOINT + 'users/register'), registerUser);

      //update maze with the new user in users
      axios.post(ENDPOINT + "mazes/updateUsers", { mazeId: GLOBAL_MAZE_ID, userId: newUser.data._id })

      const loginUser = {
        email: email,
        password: password,
      }

      const loginRes = await axios.post((ENDPOINT + 'users/login'), loginUser);

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
    <div className="registerForm ml-5 mr-5" style={{"color": "white"}}>
      <br/>
      <h3>Register an account</h3>
      <form onSubmit={onSubmit}>
        
        {error ? <label className="form-text text-danger">{error}</label> : null}

        <div className="form-row">
          <div className="col">
            <label>Email</label>
            <input type="email" required className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="col">
            <label>Username</label>
            <input type="text" required className="form-control" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
          </div>
        </div>
        <br/>
        <div className="form-row">
          <div className="col">
            <label>Password</label>
            <input type="password" required className="form-control" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="col">
            <label>Password Verification</label>
            <input type="password" required className="form-control" placeholder="Enter password verification" onChange={(e) => setPasswordCheck(e.target.value)}/>
          </div>
        </div>

        <br/>
        <input type="submit" value="Create User" className='btn btn-primary'/>

      </form>
    </div>
  );
}


export default Register;
