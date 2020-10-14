import React, { /*useState*/ useContext } from 'react';
import { useHistory } from "react-router-dom";
import logo from '../imgs/maze.png';
import './Navbar.css';
import UserContext from '../context/UserContext';
import User from '../objects/User';


const Navbar = () => {
	const history = useHistory();
	const { userData, setUserData } = useContext(UserContext);

	const routeHome = () => {
		history.push('/');
	}

	const routeMazer = () => {
		history.push('/mazer');
	}

	const routeLogin = () => {
		history.push('/login');
	}

	const routeRegister = () => {
		history.push('/register');
	}

	const logout = () => {
		setUserData({
			token: "",
			user: new User("", "", 0, 0)
		});
		localStorage.setItem("auth-token", "");
		//history.push('/')
	}

	return (
		<nav className="navbar navbar-dark sticky-top bg-primary">
		<div className="logo">
			<a href="/">
				<img className="logo_image" src={logo} alt="logo"/>
			</a>
			<button className="btn btn-dark" onClick={routeHome}>Home</button>
			<button className="btn btn-dark" onClick={routeMazer}>Mazer</button>
		</div>

		<div className="login">
			{
				userData.user.username !== "" ? 
				<div className="p-1"><button className="btn btn-dark" onClick={logout}>Logout</button></div> :
				<>
				<div className="p-1"><button className="btn btn-dark" onClick={routeLogin}>Login</button></div>
				<div className="p-1"><button className="btn btn-dark" onClick={routeRegister}>Register</button></div>
				</>
			}

		</div>
		</nav>
	);
}

export default Navbar;
