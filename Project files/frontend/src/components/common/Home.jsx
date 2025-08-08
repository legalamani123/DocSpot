import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import p3 from '../../images/p3.webp';
import './Home.css'; 

const Home = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-#cad8da px-4 py-2 shadow-sm">
        <Navbar.Brand className="navbar-brand-custom">
          <Link to="/">BOOK A DOCTOR</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Link to="/login">
              <button className="nav-button">Login</button>
            </Link>
            <Link to="/register">
              <button className="nav-button">Register</button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="landing-wrapper">
        <div className="landing">
          <div className="landing-image">
            <img src={p3} alt="Doctors" />
          </div>
          <div className="landing-text">
            <h2>Effortlessly schedule your doctor</h2>
            <p>
              appointments with just a few clicks,<br />
              putting your health in your hands.
            </p>
            <Link to="/login" className="book-btn">
              Book your Doctor
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
