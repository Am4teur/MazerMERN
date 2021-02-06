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

/*<div class="wrapper">

    <!-- Sidebar -->
    <nav id="sidebar">
        ...
    </nav>

    <!-- Page Content -->
    <div id="content">
        <!-- We'll fill this with dummy content -->
    </div>

</div>  */

	return (
		<nav className={"sidebar navbar-dark bg-primary d-flex flex-column flex-start justify-content-start "+props.isHidden}>
			<div className="sidebar-header d-flex justify-content-center mt-2 pr-2">
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
  
  /*return (
    <nav id="sidebar">
      <div className="sidebar-header">
          <h3>Bootstrap Sidebar</h3>
          <strong>BS</strong>
      </div>

      <ul className="list-unstyled components">
          <li className="active">
              <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                  <i className="fas fa-home"></i>
                  Home
              </a>
              <ul className="collapse list-unstyled" id="homeSubmenu">
                  <li>
                      <a href="#">Home 1</a>
                  </li>
                  <li>
                      <a href="#">Home 2</a>
                  </li>
                  <li>
                      <a href="#">Home 3</a>
                  </li>
              </ul>
          </li>
          <li>
              <a href="#">
                  <i className="fas fa-briefcase"></i>
                  About
              </a>
              <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                  <i className="fas fa-copy"></i>
                  Pages
              </a>
              <ul className="collapse list-unstyled" id="pageSubmenu">
                  <li>
                      <a href="#">Page 1</a>
                  </li>
                  <li>
                      <a href="#">Page 2</a>
                  </li>
                  <li>
                      <a href="#">Page 3</a>
                  </li>
              </ul>
          </li>
      </ul>

    </nav>

  );*/
}

export default Sidebar;
