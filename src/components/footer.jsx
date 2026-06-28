import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  // Smooth scroll entry animation engine
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('footer-reveal--active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const footerBlock = document.querySelector('.luxe-footer');
    if (footerBlock) observer.observe(footerBlock);

    return () => {
      if (footerBlock) observer.unobserve(footerBlock);
    };
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("💖 Welcome to the inner circle of Look Well Parlor Royalty.");
  };

  return (
    <footer className="luxe-footer footer-reveal">
      {/* Soft Ambient Light Glow Layers */}
      <div className="footer-glow-left" aria-hidden="true"></div>
      <div className="footer-glow-right" aria-hidden="true"></div>

      <div className="footer-container">
        
        {/* BRAND IDENTITY COLUMN */}
        <div className="footer-column brand-column">
          <Link to="/" className="footer-brand-logo" aria-label="Look Well Parlor Home">
            Look Well
          </Link>
          <p className="brand-description">
            An avant-garde oasis where luxury meets high-performance beauty styling. Crafting magical bridal narratives and timeless transformations since 2011.
          </p>
          <div className="footer-social-wrapper">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-link" aria-label="Follow us on Instagram">
              <span className="icon-platform">IG</span>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-link" aria-label="Follow us on Facebook">
              <span className="icon-platform">FB</span>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="social-icon-link" aria-label="Follow us on Pinterest">
              <span className="icon-platform">PIN</span>
            </a>
          </div>
        </div>

        {/* QUICK EXPLORE LINKS COLUMN */}
        <div className="footer-column links-column">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links-list">
            <li><Link to="/">Home Atelier</Link></li>
            <li><Link to="/premium">Our Premium Collection</Link></li>
            <li><Link to="/contact">Book Your Slot</Link></li>
          </ul>
        </div>

        {/* ATELIER CONTACT DETAILS COLUMN */}
        <div className="footer-column contact-column">
          <h3 className="footer-heading">Contact Details</h3>
          <ul className="footer-contact-list">
            <li>
              <span className="contact-prefix">🌸</span>
              <p>Sindhi Camp, Pakki Kholi, Near Patel, India</p>
            </li>
            <li>
              <span className="contact-prefix">📞</span>
              <p>+91 77209 29132</p>
            </li>
            <li>
              <span className="contact-prefix">✉️</span>
              <p>lookwellparlor@gmail.com</p>
            </li>
          </ul>
        </div>

        {/* PRIVÉ NEWSLETTER COLUMN */}
        <div className="footer-column newsletter-column">
          <h3 className="footer-heading">Newsletter</h3>
          <p className="newsletter-text">
            Subscribe to secure premium priority lookbook releases, bridal slot drops, and private event passes.
          </p>
          <form className="footer-newsletter-form" onSubmit={handleNewsletterSubmit}>
            <div className="footer-input-group">
              <input 
                type="email" 
                placeholder="Your Luxury Email Address" 
                aria-label="Email address for newsletter" 
                required 
              />
              <button type="submit" className="footer-submit-btn" aria-label="Join newsletter">
                Join <span>→</span>
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* METADATA & LEGAL BOTTOM BAR */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            &copy; 2026 Look Well Parlor. Created for Elite Aesthetics. All Rights Reserved.
          </p>
          <div className="footer-bottom-legal">
            <a href="#privacy">Privacy Policy</a>
            <span className="legal-divider">🌸</span>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;