import React from 'react';
import IconComponent from './IconComponent';



interface UserInfoProps {
  username: string;
  icon: any;
}

const UserInfo = (props: UserInfoProps) => {
  return (
    <div className="userInfo">
      <label htmlFor="username" style={{color: "white"}}>Username: {props.username}</label>
      <br/>
      <label htmlFor="icon" style={{color: "white"}}>Icon: <IconComponent iconName={props.icon} size={16}/></label>
    </div>
  );
}


export default UserInfo;