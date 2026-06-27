import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile drawer menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} 
      aria-label="Main Navigation"
    >
      <div className="navbar__container">
        
        {/* --- LEFT SIDE: LUXURY LOGO --- */}
        <div className="navbar__logo-wrapper">
          <Link to="/" className="navbar__logo" onClick={closeMenu} aria-label="Look Well Parlor Home">
            Look Well
          </Link>
        </div>

        {/* --- CENTER: NAVIGATION LINKS --- */}
        <div className={`navbar__menu-wrapper ${isMenuOpen ? 'navbar__menu-wrapper--open' : ''}`}>
          <ul className="navbar__links">
            <li className="navbar__item" style={{ '--item-index': 1 }}>
              <NavLink 
                to="/" 
                className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                onClick={closeMenu}
                end
              >
                Home
              </NavLink>
            </li>
            <li className="navbar__item" style={{ '--item-index': 2 }}>
              <NavLink 
                to="/premium" 
                className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                onClick={closeMenu}
              >
                Our Premium Collection
              </NavLink>
            </li>
            <li className="navbar__item" style={{ '--item-index': 3 }}>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>
          </ul>
          
          {/* Mobile-only CTA Button inside drawer */}
          <div className="navbar__mobile-cta">
            <button className="navbar__btn navbar__btn--mobile" aria-label="Book an Appointment">
              Book Appointment
            </button>
          </div>
        </div>

        {/* --- RIGHT SIDE: CTA BUTTON & HAMBURGER --- */}
        <div className="navbar__actions">
          <button className="navbar__btn navbar__btn--desktop" aria-label="Book an Appointment">
            Book Appointment
          </button>

          {/* Hamburger Menu Icon */}
          <button 
            className={`navbar__hamburger ${isMenuOpen ? 'navbar__hamburger--open' : ''}`} 
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;