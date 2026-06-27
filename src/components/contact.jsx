import React, { useState, useEffect } from 'react';
import './contact.css';

const Contact = () => {
  // Accordion active state index tracking
  const [activeFaq, setActiveFaq] = useState(null);

  // Form input validation state architecture
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Scroll Reveal Observer Setup
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('luxe-fade-up--active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.luxe-fade-up');
    elements.forEach((el) => revealObserver.observe(el));

    return () => elements.forEach((el) => revealObserver.unobserve(el));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.phone) {
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    { q: "Do I need to book an appointment?", a: "Yes. Appointments help us provide personalized service and reduce waiting time." },
    { q: "Do you provide bridal makeup at the venue?", a: "Yes. We provide both in-salon and destination bridal makeup services." },
    { q: "Which beauty brands do you use?", a: "We use premium international and professional beauty products that are skin-friendly and long-lasting." },
    { q: "Do you provide trial bridal makeup?", a: "Yes. Trial sessions are available before your wedding day." },
    { q: "Can I customize bridal packages?", a: "Absolutely. Our bridal packages are fully customizable according to your needs and budget." },
    { q: "How can I contact Look Well Parlor?", a: "You can call us on +91 77209 29132 or visit us at Sindhi Camp, Pakki Kholi, Near Patel." }
  ];

  const reviewData = [
    { name: "Ananya Sharma", role: "Elite Bride", review: "The premium bridal package made me feel like royalty on my wedding day. The glassmorphism and ambient care here is exceptional!" },
    { name: "Priya Patel", role: "Regular Client", review: "Their hair spa treatments and premium balayage transformation services are world-class. Absolute value for money luxury." },
    { name: "Riya Deshmukh", role: "Bridal Client", review: "The flawless airbrush makeup exceeded my wild expectations. Skin-friendly products that lasted well over 14 hours!" }
  ];

  return (
    <div className="luxe-contact-page">
      {/* ==========================================================================
         SECTION 1: LUXURY HERO BANNER
         ========================================================================== */}
      <section className="luxe-contact-hero">
        <div className="hero-floating-elements" aria-hidden="true">
          <div className="petal p1">🌸</div>
          <div className="petal p2">✨</div>
          <div className="petal p3">🌸</div>
          <div className="glow-circle gc1"></div>
          <div className="glow-circle gc2"></div>
        </div>

        <div className="luxe-contact-hero__container">
          <div className="luxe-contact-hero__left">
            <span className="luxe-tagline">Where Elegance Meets Perfection</span>
            <h1 className="luxe-hero-heading">Let's Make You <br /><span className="luxe-accent-text">Look Beautiful</span></h1>
            <p className="luxe-hero-paragraph">
              Have questions about our bridal packages, party makeup, skincare, hair styling, or appointments? Our beauty experts are always happy to assist you.
            </p>
            <div className="luxe-hero-buttons">
              <button className="btn-luxe btn-luxe--gradient">Book Appointment</button>
              <button className="btn-luxe btn-luxe--outline">Call Now</button>
            </div>
          </div>

          <div className="luxe-contact-hero__right">
            <div className="luxury-illustration-card">
              <div className="illustration-inner-circle">
                <span>Look Well Ateliers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 2: CONTACT INFORMATION CARDS
         ========================================================================== */}
      <section className="luxe-info-section luxe-fade-up">
        <div className="luxe-info-grid">
          <div className="info-glass-card">
            <div className="info-icon">📍</div>
            <h3>Address</h3>
            <p>Sindhi Camp, Pakki Kholi, Near Patel, India</p>
          </div>
          <div className="info-glass-card">
            <div className="info-icon">📞</div>
            <h3>Phone</h3>
            <p>+91 77209 29132</p>
          </div>
          <div className="info-glass-card">
            <div className="info-icon">✉️</div>
            <h3>Email</h3>
            <p>lookwellparlor@gmail.com</p>
          </div>
          <div className="info-glass-card">
            <div className="info-icon">⏳</div>
            <h3>Working Hours</h3>
            <p>Monday – Sunday <br />9:00 AM – 8:00 PM</p>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 3: CONTACT FORM SECTOR
         ========================================================================== */}
      <section className="luxe-form-section luxe-fade-up">
        <div className="luxe-form-container">
          <div className="luxe-form-left-visual">
            <div className="visual-image-overlay">
              <h2>Experience True Royalty</h2>
            </div>
          </div>
          
          <div className="luxe-form-right-content">
            <h2>Send Us A Message</h2>
            <form onSubmit={handleFormSubmit} className="luxe-interactive-form">
              <div className="input-group">
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleInputChange} 
                  required 
                  placeholder=" " 
                />
                <label>Full Name</label>
              </div>

              <div className="input-group">
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                  placeholder=" " 
                />
                <label>Email Address</label>
              </div>

              <div className="input-group">
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  required 
                  placeholder=" " 
                />
                <label>Phone Number</label>
              </div>

              <div className="input-group">
                <select name="service" value={formData.service} onChange={handleInputChange} required>
                  <option value="" disabled hidden></option>
                  <option value="bridal">Bridal Makeup</option>
                  <option value="party">Party Makeup</option>
                  <option value="hair-styling">Hair Styling</option>
                  <option value="hair-spa">Hair Spa</option>
                  <option value="facial">Facial</option>
                  <option value="skin-care">Skin Care</option>
                  <option value="nail-art">Nail Art</option>
                </select>
                <label className="select-label">Select Service</label>
              </div>

              <div className="input-group">
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  required 
                  placeholder=" "
                ></textarea>
                <label>Your Message</label>
              </div>

              <button type="submit" className="btn-luxe btn-luxe--gradient form-submit-btn">
                Submit Message
              </button>

              {formSubmitted && (
                <div className="form-success-toast">
                  ✨ Thank you! Your luxury appointment query has been dispatched safely.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 4: GOOGLE MAP SECTION
         ========================================================================== */}
      <section className="luxe-map-section luxe-fade-up">
        <div className="luxe-map-card">
          <h2>Visit Our Beauty Studio</h2>
          <p>Sindhi Camp, Pakki Kholi, Near Patel, India</p>
          <div className="map-frame-placeholder">
            <div className="map-pins-indicator">📍</div>
            <span>Google Maps Interactive Integration Block</span>
          </div>
          <button className="btn-luxe btn-luxe--outline directions-btn">Get Directions</button>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 5: FREQUENTLY ASKED QUESTIONS (ACCORDION)
         ========================================================================== */}
      <section className="luxe-faq-section luxe-fade-up">
        <div className="faq-wrapper">
          <h2 className="section-title-centered">Frequently Asked Questions</h2>
          <div className="luxe-accordion">
            {faqData.map((item, index) => (
              <div 
                key={index} 
                className={`accordion-item ${activeFaq === index ? 'accordion-item--active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="accordion-trigger">
                  <h3>{item.q}</h3>
                  <span className="accordion-icon">✦</span>
                </div>
                <div className="accordion-content">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 6: CUSTOMER REVIEWS
         ========================================================================== */}
      <section className="luxe-reviews-section luxe-fade-up">
        <h2 className="section-title-centered">Loved By Connoisseurs</h2>
        <div className="reviews-grid">
          {reviewData.map((review, idx) => (
            <div key={idx} className="review-glass-card">
              <span className="quote-badge">“</span>
              <div className="stars-row">★★★★★</div>
              <p className="review-text">{review.review}</p>
              <div className="review-profile">
                <div className="profile-placeholder"></div>
                <div>
                  <h4>{review.name}</h4>
                  <p>{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================================================
         SECTION 7: CALL TO ACTION
         ========================================================================== */}
      <section className="luxe-cta-section luxe-fade-up">
        <div className="cta-banner-card">
          <h2>Ready To Experience Luxury Beauty?</h2>
          <p>Book your appointment today and let our professionals transform your beauty into confidence.</p>
          <button className="btn-luxe btn-luxe--gradient cta-btn">Book Appointment</button>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 8: FOOTER PREVIEW
         ========================================================================== */}
      <footer className="luxe-contact-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h2>Look Well</h2>
            <p>Timeless luxury, bridal heritage, and transformative beauty artistry.</p>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>Home</li>
              <li>Services</li>
              <li>Premium Collection</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="footer-details">
            <h3>Contact Details</h3>
            <p>📞 +91 77209 29132</p>
            <p>✉️ lookwellparlor@gmail.com</p>
          </div>
          <div className="footer-newsletter">
            <h3>Newsletter</h3>
            <div className="footer-input-box">
              <input type="email" placeholder="Your Email Address" />
              <button>Join</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Look Well Parlor Ateliers. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;