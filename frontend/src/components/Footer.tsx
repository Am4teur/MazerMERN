import React, { /*useState*/ } from 'react';
import typescripticon from '../imgs/typescript.svg';
import socketicon from '../imgs/socketicon.png';
import './Footer.css';

// https://dev.to/letsbsocial1/flexbox-sticky-footer-and-react-e1h
const Footer = () => {
  return (

  <div className="footer bg-primary pt-4">

    <div className="footer-icons">

      <ul className="list-unstyled list-inline text-center">
        <li className="list-inline-item">
          <a className="bg-dark" href="https://github.com/Am4teur">                  <i className="fa fa-github">    </i></a>
        </li>
        <li className="list-inline-item">
          <a className="bg-dark" href="https://www.linkedin.com/in/danieldmcastro/"> <i className="fa fa-linkedin">  </i></a>
        </li>
        <li className="list-inline-item">
          <a className="bg-dark" href="https://www.instagram.com/danieldmcastro/">   <i className="fa fa-instagram"> </i></a>
        </li>
        <li className="list-inline-item">
          <a className="bg-dark" href="https://www.facebook.com/daniel.castro.11/">  <i className="fa fa-facebook">  </i></a>
        </li>
      </ul>

    </div>
    

  <div className="footer-copyright text-center mb-3">© 2020 Copyright and Created by&nbsp;
    <a className="text-white" style={{textDecoration: "none"}} href="https://github.com/Am4teur">Daniel Castro </a>
    with &nbsp;
    <a href="https://reactjs.org/"><i className="fab fa-react" style={{color: "black"}}></i></a> &nbsp;
    <a href="https://www.typescriptlang.org/"><img className="mb-1" src={typescripticon} style={{width: "12px", height: "12px"}}></img></a> &nbsp;
    <a href="https://socket.io/"><img className="mb-1" src={socketicon} style={{width: "12px", height: "12px"}}></img></a>
  </div>

</div>  
  )
}

export default Footer;