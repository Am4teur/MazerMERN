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
    <>
		<nav className={"sidebar navbar-dark bg-primary d-flex flex-column flex-start justify-content-start "+props.isHidden}>
			<div className="sidebar-header d-flex justify-content-center m-3 pr-2">
        <a className="d-flex flex-row flex-start justify-content-start" href="/" style={{color: "white", fontSize: "1rem", textDecoration: "none" }}>
					<img className="d-inline-block align-center mr-2" src={logo} alt="logo" style={{width: "32px", height: "32px"}}/>
					<h3>Mazer</h3>
				</a>
			</div>

			<a className="btn btn-primary" href="/">Home</a>

			<button className="btn btn-primary" onClick={routeMazer}>Mazer</button>

			<button className="btn btn-primary" onClick={routeMazeHome}>Maze Home</button>

      <div className="my-4" style={{borderBottom: "1px solid black"}}></div>

      <div className="auth d-flex flex-column align-items-start"> {/*className="auth mt-auto" to stick it at bottom of sidebar*/}
        {userData.user.username !== "" ?
        <>
          <button className="btn btn-labeled btn-dark ml-2 mb-2" onClick={userInfo}><span className="btn-label"><i className="fas fa-user"></i></span>{userData.user.username}</button>
          <button className="btn btn-labeled btn-dark ml-2" onClick={routeLogout}><span className="btn-label"><i className="fas fa-sign-out-alt"></i></span>Logout</button>
        </>
        :
        <NoAuthBtns />
      }
    	</div>
		</nav>
    <nav className={"sb-filler " + props.isHidden}></nav>
    </>
  );
}

export default Sidebar;
