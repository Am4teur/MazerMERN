import React, { /*useState*/ } from 'react';
import logo from '../imgs/maze.png';
import './Footer.css';


const Footer = () => {
  return (
    <div className="footer-distributed">
      <div className="footer-left">
        <img className="logo_footer" src={logo} alt="logo"/>
        <p className="footer-links">
          <a href="#">Home</a>
          <br/>
          <a href="#">About</a>
        </p>
        <p className="footer-company-name">Daniel Castro © 2020</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>Lisbon, Portugal</p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>
          <p><a href="mailto:support@company.com">daniel.7c.n12@gmail.com</a></p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About this project</span>
          Mazer is a simple maze game with the objective of learning react using
           MERN (MongoDB, Express, React, Node.js) + socket.io to have MongoDB with real-time updates.
          It also gave me the opportunity to practice the core search concepts and algorithms that I have learned.
        </p>
        <div className="footer-icons">
          <a href="https://github.com/Am4teur">                 <i className="fa fa-github"></i></a>
          <a href="https://www.facebook.com/daniel.castro.11/"> <i className="fa fa-facebook"></i></a>
          <a href="https://www.instagram.com/danieldmcastro/">  <i className="fa fa-instagram"></i></a>
          <a href="https://www.linkedin.com/in/danieldmcastro/"><i className="fa fa-linkedin"></i></a>
        </div>
      </div>

    </div>
  )
}

export default Footer;