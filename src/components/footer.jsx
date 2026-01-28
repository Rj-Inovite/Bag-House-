import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const whatsappNumber = "9405515667";
  // The link format for WhatsApp: https://wa.me/number
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <footer className="main-footer">
      <div className="footer-container">
        
        {/* Section 1: Brand & Tagline */}
        <div className="footer-brand">
          <h2 className="footer-logo">Darshan Bag House</h2>
          <p className="footer-tagline">
            "Carrying Your Dreams with Elegance & Endurance"
          </p>
          <div className="footer-divider"></div>
        </div>

        {/* Section 2: Quick Links */}
        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Section 3: Connect with Us */}
        <div className="footer-contact">
          <h4>Connect</h4>
          <p>Have questions? Chat with us instantly.</p>
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="whatsapp-btn"
          >
            <span className="wa-icon">💬</span> Chat on WhatsApp
          </a>
          <p className="phone-display">Support: +91 {whatsappNumber}</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Darshan Bag House. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;