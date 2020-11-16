import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import IconComponent from './IconComponent';



interface UserInfoProps {
  icon: string;
}

const UserInfo = (props: UserInfoProps) => {
  const { userData } = useContext(UserContext);
  
  return (
    <div className="userInfo">
      <label htmlFor="username" style={{color: "white"}}>Username: {userData.user.username}</label>
      <br/>
      <label htmlFor="icon" style={{color: "white"}}>Icon: <IconComponent iconName={props.icon} size={16}/></label>
      <br/>
      <label htmlFor="id" style={{color: "white"}}>id: {userData.user.id}</label>
      {/*
      <br/>
      <label htmlFor="x" style={{color: "white"}}>x: {userData.user.x}</label>
      <br/>
      <label htmlFor="y" style={{color: "white"}}>y: {userData.user.y}</label>
      */}
    </div>
  );
}


export default UserInfo;