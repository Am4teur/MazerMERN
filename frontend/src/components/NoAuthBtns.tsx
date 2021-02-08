import React from 'react';
import { useHistory } from "react-router-dom";
import './Navbar.css';


const NoAuthBtns = () => {
	const history = useHistory();

	const routeTemp = () => {
		history.push('/temp');
	}

	const routeLogin = () => {
		history.push('/login');
	}

	const routeRegister = () => {
		history.push('/register');
	}

	return (
		<div className="d-flex flex-column justify-content-center">
			<div className="col-md-auto p-1"><button className="btn btn-dark" onClick={routeTemp}>Temp User</button></div>
			<div className="col-md-auto p-1"><button className="btn btn-labeled btn-dark" onClick={routeLogin}><span className="btn-label"><i className="fas fa-sign-in-alt"></i></span>Login</button></div>
			<div className="col-md-auto p-1"><button className="btn btn-labeled btn-dark" onClick={routeRegister}><span className="btn-label"><i className="fas fa-user"></i></span>Register</button></div>
		</div>
	);
}

export default NoAuthBtns;
