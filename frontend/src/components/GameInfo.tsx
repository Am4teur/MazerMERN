import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import arrow_keys from '../imgs/arrow_keys_grey.png';
import './Navbar.css'; // for button with icons and text separated
import NoAuthBtns from './NoAuthBtns';

const GameInfo = () => {
  const { userData } = useContext(UserContext);

  return (
    <div className="info my-4">
      {userData.user.username !== ""
      ?
      <>
        <h1>Mazer</h1>
        <h2>Complete the maze by collecting the cup <span role="img" aria-label="Cup">🏆</span></h2>
        <h3>Use your arrow keys to move <img src={arrow_keys} className="arrow_keys" width={40} height={40} alt="arrow_keys"/> </h3>
      </>
      :
      <>
        <h1 className="my-4">You need to login or register to play online.</h1>
        <NoAuthBtns/>
      </>
      }
    </div>
  );
}


export default GameInfo;