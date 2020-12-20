import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import IconComponent from './IconComponent';



interface UserInfoProps {
  icon: string;
}

const UserInfo = (props: UserInfoProps) => {
  const { userData } = useContext(UserContext);
  
  return (
    <div className="userInfo my-4">

      <div className="row">
        <div className="col">
          <h2 style={{color: "white"}}>Username -> {userData.user.username}</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-auto">
          <h2 style={{color: "white"}}>Icon -> </h2>
        </div>
        <div className="col-md-auto my-2">
          <IconComponent iconName={props.icon} size={16}/>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2 style={{color: "white"}}>id -> {userData.user.id}</h2>
        </div>
      </div>
    </div>
  );
}


export default UserInfo;