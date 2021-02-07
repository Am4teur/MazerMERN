import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import logo from '../imgs/maze.png';
import UserContext from '../context/UserContext';
import User from '../objects/User';
import NoAuthBtns from './NoAuthBtns';


interface SidebarProps {
  isHidden:string;
}

const Sidebar = (props:SidebarProps) => {
  const history = useHistory();
	const { userData, setUserData } = useContext(UserContext);

	const routeHome = () => {
		history.push('/');
	}

	const routeMazer = () => {
		history.push({
			pathname: '/mazer',
			state: {
				mazeId: "5fbac485d8017b593cf11df5"
			}
		  });
	}

	const routeLogout = () => {
		setUserData({
			token: "",
			user: new User(),
			loading: false,
		});
		localStorage.setItem("auth-token", "");
		history.push('/')
	}

	const userInfo = () => {
		history.push('/userInfo');
	}

	const routeMazeHome = () => {
		history.push('/mazeHome');
	}

	return (
		<nav className={"sidebar navbar-dark bg-primary d-flex flex-column flex-start justify-content-start "+props.isHidden}>
			<div className="sidebar-header d-flex justify-content-center m-3 pr-2">
        <a className="d-flex flex-row flex-start justify-content-start" href="/" style={{color: "white", fontSize: "1rem", textDecoration: "none" }}>
					<img className="d-inline-block align-center mr-2" src={logo} alt="logo" style={{width: "32px", height: "32px"}}/>
					<h3>Mazer</h3>
				</a>
			</div>

			<button className="btn btn-primary" onClick={routeHome}>Home</button>

			<button className="btn btn-primary" onClick={routeMazer}>Mazer</button>

			<button className="btn btn-primary" onClick={routeMazeHome}>Maze Home</button>

      <div className="auth mt-auto">
        {userData.user.username !== "" ?
        <>
          <div className="p-1"><button className="btn btn-labeled btn-primary" onClick={userInfo}><span className="btn-label"><i className="fas fa-user"></i></span>{userData.user.username}</button></div>
          <div className="p-1"><button className="btn btn-labeled btn-primary" onClick={routeLogout}><span className="btn-label"><i className="fas fa-sign-out-alt"></i></span>Logout</button></div>
        </>
        :
        <NoAuthBtns />
      }
    	</div>
		</nav>
  );
}

export default Sidebar;
