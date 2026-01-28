import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar fade-down">
      <div className="nav-container">
        
        {/* Navigation Group: Brings items closer together */}
        <div className="nav-content-wrapper">
          
          {/* Left Side */}
          <div className={`nav-group ${isOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-item" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/shop" className="nav-item" onClick={() => setIsOpen(false)}>Shop</Link>
          </div>

          {/* Central Brand */}
          <div className="logo-container">
            <div className="oval-logo">
              <span className="logo-text">DARSHAN</span>
            </div>
          </div>

          {/* Right Side */}
          <div className={`nav-group ${isOpen ? 'active' : ''}`}>
            <Link to="/contact" className="nav-item" onClick={() => setIsOpen(false)}>Contact</Link>
          </div>

        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span className={isOpen ? 'bar open' : 'bar'}></span>
          <span className={isOpen ? 'bar open' : 'bar'}></span>
          <span className={isOpen ? 'bar open' : 'bar'}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;