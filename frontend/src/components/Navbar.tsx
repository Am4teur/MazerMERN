import React, { /*useState*/ useContext } from 'react';
import { useHistory } from "react-router-dom";
import logo from '../imgs/maze.png';
import './Navbar.css';
import UserContext from '../context/UserContext';
import User from '../objects/User';
import NoAuthBtns from './NoAuthBtns';


interface NavbarProps {
	user: User,
}

const Navbar = (props: NavbarProps) => {
	const history = useHistory();
	const { userData, setUserData } = useContext(UserContext);

	const routeHome = () => {
		history.push('/');
	}

	const routeMazer = () => {
		history.push('/mazer');
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
		<nav className="navbar navbar-dark bg-primary">
		<div className="navbar-left">
			<div className="logo_image pr-3">
				<a href="/"><img className="logo" src={logo} alt="logo"/></a>
			</div>
			<div className="p-1">
				<button className="btn btn-dark" onClick={routeHome}>Home</button>
			</div>
			<div className="p-1">
				<button className="btn btn-dark" onClick={routeMazer}>Mazer</button>
			</div>
			<div className="p-1">
				<button className="btn btn-dark" onClick={routeMazeHome}>Maze Home</button>
			</div>
		</div>

		<div className="authentication">
			{
			userData.user.username !== "" ?
			<>

				<div className="p-1"><button className="btn btn-labeled btn-dark" onClick={userInfo}><span className="btn-label"><i className="fas fa-user"></i></span>{userData.user.username}</button></div>
				<div className="p-1"><button className="btn btn-labeled btn-dark" onClick={routeLogout}><span className="btn-label"><i className="fas fa-sign-out-alt"></i></span>Logout</button></div>
			</>
			:
			<NoAuthBtns />
		}

		</div>
		</nav>
	);
}

export default Navbar;
