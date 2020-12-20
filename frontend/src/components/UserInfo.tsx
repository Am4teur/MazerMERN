import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import IconComponent from './IconComponent';
import './Navbar.css'; // for button with icons and text separated
import NoAuthBtns from './NoAuthBtns';


const UserInfo = () => {
  const { userData } = useContext(UserContext);
  
  return (
    <div className="userInfo my-4">

      {
      userData.user.username !== ""
      ?
      <>
      <div className="row justify-content-center">
        <div className="col-md-auto">
          <h2 style={{color: "white"}}>Username: {userData.user.username}</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-auto">
          <h2 style={{color: "white"}}>Icon: </h2>
        </div>
        <div className="col-md-auto my-2">
          <IconComponent iconName={userData.user.icon} size={32}/>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-auto">
          <h2 style={{color: "white"}}>id: {userData.user.id}</h2>
        </div>
      </div>
      </>
      :
      <>
        <h1 className="my-4">You need to login or register to play online.</h1>
        <NoAuthBtns />
      </>
    }
    </div>
  );
}


export default UserInfo;