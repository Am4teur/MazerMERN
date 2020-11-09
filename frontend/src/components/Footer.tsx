import React, { /*useState*/ } from 'react';
//import logo from '../imgs/maze.png';
import './Footer.css';

// https://dev.to/letsbsocial1/flexbox-sticky-footer-and-react-e1h
const Footer = () => {
  return (

  <div className="footer bg-primary pt-4">

    <div className="footer-icons">

      <ul className="list-unstyled list-inline text-center">
        <li className="list-inline-item">
          <a href="https://github.com/Am4teur">                  <i className="fa fa-github">    </i></a>
        </li>
        <li className="list-inline-item">
          <a href="https://www.linkedin.com/in/danieldmcastro/"> <i className="fa fa-linkedin">  </i></a>
        </li>
        <li className="list-inline-item">
          <a href="https://www.instagram.com/danieldmcastro/">   <i className="fa fa-instagram"> </i></a>
        </li>
        <li className="list-inline-item">
          <a href="https://www.facebook.com/daniel.castro.11/">  <i className="fa fa-facebook">  </i></a>
        </li>
      </ul>

    </div>

  <div className="footer-copyright text-center pb-3">© 2020 Copyright: 
    <a className="text-white" style={{textDecoration: "none"}} href="https://github.com/Am4teur"> Daniel Castro</a>
  </div>

</div>  
  )
}

export default Footer;