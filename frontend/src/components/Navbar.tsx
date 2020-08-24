import React/*, { Component }*/ from 'react';
import logo from '../imgs/maze.png';
import './Navbar.css';


function gotoAuthHTML() {
	console.log("auth");
}

function Navbar() {
	return (
		<nav className="navbar navbar-dark sticky-top bg-primary">
		<div className="logo">
		<a href="/">
			<img className="logo_image" src={logo} alt="logo"/>
		</a>
		<button className="btn btn-dark">Stuff...</button>
		</div>

		<div className="login">
			<div className="p-1"><button className="btn btn-dark">Login</button></div>
			<div className="p-1"><button className="btn btn-dark" onClick={gotoAuthHTML}>Register</button></div>
		</div>
		</nav>

	);
}

export default Navbar;






/*
<nav class="navbar navbar-dark sticky-top bg-primary">
	<!-- Logo image + Stuff btn -->
	<div class="logo">
        <a href="/">
            <img class="logo_image" src="imgs/maze.png" alt="Mazerlogo">
		</a>
		<button class="btn btn-dark button">Stuff...</button>
    </div>

    <!-- Login & Sign In -->
    <div class="login">
        <div class="p-1"><button class="btn btn-dark">Login</button></div>
        <div class="p-1"><button class="btn btn-dark" onclick="gotoAuthHTML()">Sign Up</button></div>
    </div>

</nav>*/