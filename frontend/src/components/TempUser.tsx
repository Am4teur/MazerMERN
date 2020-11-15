import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import "../App.css";
import UserContext from '../context/UserContext';

const { v4: uuidv4 } = require('uuid');


let ENDPOINT = 'http://localhost:5000/';


const TempUser = () => {  
  const history = useHistory();

  var { setUserData } = useContext(UserContext);


  const createTempUser = async (e: any): Promise<void> => {
    e.preventDefault();


    const rnd:string = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    console.log(rnd);

    try{
      const registerUser = {
        email: "temp"+rnd+"@temp.com",
        password: rnd,
        passwordCheck: rnd,
        username: "temp"+rnd.substring(0, 8),
      }

      console.log(await axios.post((ENDPOINT + 'users/registertemp'), registerUser));

      const loginUser = {
        email: "temp"+rnd+"@temp.com",
        password: rnd,
      }

      const loginRes = await axios.post((ENDPOINT + 'users/logintemp'), loginUser);

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
        loading: false,
      })
      localStorage.setItem("auth-token", loginRes.data.token)

      history.push('/');
    } catch(err) {
      console.log(err.response.data.msg);
    }
  }


  return (
    <div>
      <span>Please consider doing a dummy account for statistical purpose.</span>
      <span>Use temporary mails :)</span>
      <div className="p-1">
        <button className="btn btn-dark" onClick={createTempUser}>Mazer</button>
      </div>
    </div>
  );
}


export default TempUser;
