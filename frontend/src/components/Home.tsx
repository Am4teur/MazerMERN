import React, { useContext } from 'react';
import UserContext from '../context/UserContext';


function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className="Home">
      <p style={{"color": "white"}}>HOME {"of " + userData.user.username}</p>
    </div>
  );
}

export default Home;