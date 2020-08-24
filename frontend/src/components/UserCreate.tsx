import React/*, { Component }*/ from 'react';
//import { Link } from 'react-router-dom';

import UserForm from './UserForm';
import UserDisplay from './UserDisplay';



function UserCreate() {
  return (
    <div className="userCreate">
      <UserForm />
      <UserDisplay />
    </div>
  );
}

export default UserCreate;