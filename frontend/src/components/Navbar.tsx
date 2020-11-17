import React, { /*useState*/ useContext } from 'react';
import { useHistory } from "react-router-dom";
import logo from '../imgs/maze.png';
import './Navbar.css';
import UserContext from '../context/UserContext';
import User from '../objects/User';


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

	const routeTemp = () => {
		history.push('/temp');
	}

	const routeLogin = () => {
		history.push('/login');
	}

	const routeRegister = () => {
		history.push('/register');
	}

	const routeLogout = () => {
		setUserData({
			token: "",
			user: new User("", "", 0, 0),
			loading: false,
		});
		localStorage.setItem("auth-token", "");
		history.push('/')
	}

	const userInfo = () => {
		history.push('/userInfo');
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
		</div>

		<div className="authentication">
			{
			userData.user.username !== "" ?
			<>
				<div className="p-1"><button className="btn btn-dark" onClick={userInfo}>{userData.user.username}</button></div>
				<div className="p-1"><button className="btn btn-dark" onClick={routeLogout}>Logout</button></div>
			</>
			:
			<>
				<div className="p-1"><button className="btn btn-dark" onClick={routeTemp}>Temp User</button></div>
				<div className="p-1"><button className="btn btn-dark" onClick={routeLogin}>Login</button></div>
				<div className="p-1"><button className="btn btn-dark" onClick={routeRegister}>Register</button></div>
			</>
		}

		</div>
		</nav>
	);
}

export default Navbar;
