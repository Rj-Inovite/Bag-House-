import React, { useState, useEffect } from 'react';
import './Contact.css';

/**
 * Premium Parlour Contact Component
 * Custom Engineered for Luxury Beauty Spaces
 * Features: Multi-Branch Selectors, Custom Dropdowns, Native Protocol Handlers, Dynamic Accordions
 */
const Contact = () => {
  // Global State Configuration
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [selectedService, setSelectedService] = useState('');
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [animatedElements, setAnimatedElements] = useState([]);

  // Business Contact Coordinates
  const phoneNumber = "7720929132";
  const formattedDisplayNumber = "+91 77209-29132";

  // Dynamic Content Collections
  const branchData = {
    main: {
      name: "Luxury Elite Studio (Main Branch)",
      address: "102, Royal Palace Enclave, Luxury District",
      timings: "10:00 AM - 8:30 PM (Daily)",
      mapHint: "Centrally located with dedicated underground parking space available."
    },
    express: {
      name: "Glow & Go Express Lounge",
      address: "Ground Floor, Terminal Galleria Mall",
      timings: "11:00 AM - 9:30 PM (Daily)",
      mapHint: "Perfect for quick touch-ups, directly adjacent to the central fountain elevator."
    }
  };

  const premiumServices = [
    { id: "bridal", label: "Bridal / Occasion Makeover" },
    { id: "hair", label: "Advanced Hair Styling & Balayage" },
    { id: "skin", label: "Medi-Facials & Radiant Skin Therapies" },
    { id: "nail", label: "Luxury Nail Extension Artistry" },
    { id: "spa", label: "Deep Tissue Relaxation Therapy" }
  ];

  const premiumFaqs = [
    {
      id: 1,
      question: "Do I need to secure an advance appointment for casual hair styling?",
      answer: "While we warmly accommodate walk-in guests whenever open slots are available, we strongly advocate booking your appointment at least 24 to 48 hours in advance. This guarantees your priority slot and matching with your preferred stylist without wait time."
    },
    {
      id: 2,
      question: "Can I easily reschedule or cancel my treatment slot?",
      answer: "Absolutely. We understand schedules fluidly change. You can effortlessly update or cancel your booking by tapping our WhatsApp direct link or placing a voice call at least 4 hours prior to your scheduled treatment time."
    },
    {
      id: 3,
      question: "Are your artists specialized in high-definition bridal makeovers?",
      answer: "Yes, our studio boasts senior bridal master-artists globally trained in high-definition, airbrush, and long-wear luxury makeup styles. We also host pre-wedding consultation packages via our WhatsApp channels."
    },
    {
      id: 4,
      question: "What hygiene benchmarks are followed at your salon branches?",
      answer: "Hygiene remains our uncompromised crown priority. Every tool undergoes multi-stage medical autoclave sterilization, single-use premium linen sheets are deployed for every client, and work surfaces are deeply sanitized between client consultations."
    }
  ];

  // Intersection Observer implementation simulated via mount cycles
  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimatedElements(prev => [...prev, 'hero']), 100),
      setTimeout(() => setAnimatedElements(prev => [...prev, 'panels']), 300),
      setTimeout(() => setAnimatedElements(prev => [...prev, 'cards']), 500),
      setTimeout(() => setAnimatedElements(prev => [...prev, 'faqs']), 700)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Safe Universal Communication Link Generative Functions
  const generateWhatsAppLink = () => {
    let messageText = "Hello! I would like to book a luxury appointment at your salon.";
    if (selectedService) {
      const serviceLabel = premiumServices.find(s => s.id === selectedService)?.label;
      messageText += ` I am specifically looking forward to booking a session for: ${serviceLabel}.`;
    }
    messageText += ` Preferred Branch location: ${branchData[selectedBranch].name}. Please guide me with availability.`;
    return `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(messageText)}`;
  };

  const handleCallExecution = (e) => {
    // Interceptor logging can be placed here if integration tracking is necessary
    window.location.href = `tel:${phoneNumber}`;
  };

  const toggleFaqAccordion = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleServiceSelect = (id) => {
    setSelectedService(id);
    setIsServiceDropdownOpen(false);
  };

  return (
    <div className="salon-ultimate-contact-root">
      
      {/* Dynamic Ambient Abstract Lights */}
      <div className="ambient-blur-element magenta-glow"></div>
      <div className="ambient-blur-element rose-gold-glow"></div>
      <div className="ambient-blur-element deep-maroon-glow"></div>

      <main className="salon-contact-content-canvas">
        
        {/* ==========================================
            SECTION 1: THE ELITE BRAND HERO TEXT 
           ========================================== */}
        <section 
          className={`salon-contact-hero-block ${animatedElements.includes('hero') ? 'fade-slide-up-active' : 'fade-slide-up-hidden'}`}
        >
          <div className="premium-tagline-capsule">
            <span className="tagline-sparkle">✨</span>
            <span className="tagline-text">Pure Indulgence & Luxury Craftsmanship</span>
          </div>
          <h1 className="salon-main-display-title">
            Begin Your Transcendent <br />
            <span className="gradient-text-accent">Beauty Journey</span>
          </h1>
          <p className="salon-hero-descriptive-para">
            Experience unmitigated pampering curated by world-class beauty artisans. Avoid queues completely by executing an instantaneous priority appointment reservation through our hotlines below.
          </p>
        </section>

        {/* ==========================================
            SECTION 2: CORE DUAL-PANEL LAYOUT 
           ========================================== */}
        <section 
          className={`salon-interactive-dual-grid ${animatedElements.includes('panels') ? 'fade-slide-up-active' : 'fade-slide-up-hidden'}`}
        >
          
          {/* PANEL A: ARTISTIC IMAGERY & BRAND VALUE STATEMENT */}
          <div className="salon-branding-visual-panel">
            <div className="visual-panel-background-image-mask"></div>
            <div className="visual-panel-tint-overlay"></div>
            
            <div className="visual-panel-content-hierarchy">
              <div className="studio-mini-badge-row">
                <span className="mini-glass-badge">ISO 9001 Sanitized</span>
                <span className="mini-glass-badge">Award Winning Team</span>
              </div>

              <div className="visual-hero-typography">
                <h3 className="visual-panel-serif-title">Where Perfection <br />Meets Elegance.</h3>
                <p className="visual-panel-body-prose">
                  Every swipe, highlight, cut, and treatment is designed precisely around your anatomical profile, bringing out your organic inner glow.
                </p>
              </div>

              {/* Dynamic Branch Details Subcard */}
              <div className="interactive-branch-subcard-glass">
                <div className="branch-selector-tab-header">
                  <button 
                    type="button"
                    className={`branch-toggle-tab ${selectedBranch === 'main' ? 'tab-state-active' : ''}`}
                    onClick={() => setSelectedBranch('main')}
                  >
                    Main Hub
                  </button>
                  <button 
                    type="button"
                    className={`branch-toggle-tab ${selectedBranch === 'express' ? 'tab-state-active' : ''}`}
                    onClick={() => setSelectedBranch('express')}
                  >
                    Express Lounge
                  </button>
                </div>

                <div className="branch-tab-body-render">
                  <h4 className="branch-render-title">{branchData[selectedBranch].name}</h4>
                  <div className="branch-meta-item">
                    <svg className="meta-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <p className="branch-meta-text">{branchData[selectedBranch].address}</p>
                  </div>
                  <div className="branch-meta-item">
                    <svg className="meta-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <p className="branch-meta-text">{branchData[selectedBranch].timings}</p>
                  </div>
                  <p className="branch-hint-text-italic">*{branchData[selectedBranch].mapHint}</p>
                </div>
              </div>

            </div>
          </div>

          {/* PANEL B: THE CALL-TO-ACTION REVOLUTION CONTROL CENTRE */}
          <div className="salon-booking-actions-panel">
            <div className="actions-panel-header-wrapper">
              <h2 className="actions-panel-header-title">Instant Reservation Engine</h2>
              <p className="actions-panel-header-subtitle">
                Select a specific target premium treatment category below to customize your instant reservation route metadata automatically.
              </p>
            </div>

            {/* Custom Styled Beauty Dropdown Menu Component */}
            <div className="custom-beauty-dropdown-container">
              <label className="dropdown-input-label-capsule">Desired Luxury Treatment (Optional)</label>
              
              <div 
                className={`custom-dropdown-trigger-field ${isServiceDropdownOpen ? 'trigger-field-focused' : ''}`}
                onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
              >
                <div className="trigger-selected-display-value">
                  {selectedService 
                    ? premiumServices.find(s => s.id === selectedService)?.label 
                    : "— Browse Treatments & Custom Stylists —"
                  }
                </div>
                <div className={`trigger-chevron-indicator-icon ${isServiceDropdownOpen ? 'chevron-rotated' : ''}`}>
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 1 7 7 13 1" />
                  </svg>
                </div>
              </div>

              {isServiceDropdownOpen && (
                <ul className="custom-dropdown-options-floating-list animate-dropdown-slide-down">
                  <li 
                    className={`dropdown-option-row-item ${selectedService === '' ? 'option-row-selected' : ''}`}
                    onClick={() => handleServiceSelect('')}
                  >
                    Clear Service Selection (General Consultation)
                  </li>
                  {premiumServices.map((service) => (
                    <li
                      key={service.id}
                      className={`dropdown-option-row-item ${selectedService === service.id ? 'option-row-selected' : ''}`}
                      onClick={() => handleServiceSelect(service.id)}
                    >
                      {service.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ACTION ELEMENTS INTERACTIVE CARD LIST STACK */}
            <div className={`action-buttons-interactive-stack ${animatedElements.includes('cards') ? 'cards-stack-in' : ''}`}>
              
              {/* PRIMARY INTERACTIVE CHANNEL: WHATSAPP RESERVATION */}
              <a 
                href={generateWhatsAppLink()}
                target="_blank" 
                rel="noopener noreferrer" 
                className="salon-premium-action-card-anchor whatsapp-channel-theme"
              >
                <div className="action-card-flex-structural-core">
                  
                  {/* Dynamic Glowing Icon Frame */}
                  <div className="action-card-icon-outer-ring">
                    <div className="action-card-icon-inner-fill">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="svg-stroke-icon">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Card Content Data Block */}
                  <div className="action-card-descriptive-text-block">
                    <div className="card-heading-row-wrapper">
                      <h3 className="card-main-action-heading">Book Appointment</h3>
                      <span className="card-badge-status status-online">Instant Booking</span>
                    </div>
                    <p className="card-supporting-explanatory-prose">
                      Launches an encrypted real-time chat with our scheduling receptionist. Ideal for sending style references or choosing times.
                    </p>
                    <div className="card-cta-action-trigger-line">
                      <span className="cta-action-text-string">Initiate WhatsApp Chat</span>
                      <span className="cta-animated-arrow-symbol">→</span>
                    </div>
                  </div>

                </div>
                {/* Micro-Interaction Card Corner Hover Line */}
                <div className="card-hover-border-accent-line"></div>
              </a>

              {/* SECONDARY INTERACTIVE CHANNEL: DIRECT TELEPHONY VOICE LINE */}
              <button 
                type="button" 
                onClick={handleCallExecution}
                className="salon-premium-action-card-anchor voice-channel-theme-button"
              >
                <div className="action-card-flex-structural-core">
                  
                  {/* Dynamic Glowing Icon Frame */}
                  <div className="action-card-icon-outer-ring">
                    <div className="action-card-icon-inner-fill">
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="svg-stroke-icon">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Card Content Data Block */}
                  <div className="action-card-descriptive-text-block">
                    <div className="card-heading-row-wrapper">
                      <h3 className="card-main-action-heading">Call Now</h3>
                      <span className="card-badge-status status-tollfree">Direct Voice</span>
                    </div>
                    <p className="card-supporting-explanatory-prose">
                      Connect with our operational concierge line instantly via cell network to address special custom styling inquiries.
                    </p>
                    <div className="card-cta-action-trigger-line">
                      <span className="cta-action-text-string">Dial Ringline: {formattedDisplayNumber}</span>
                      <span className="cta-animated-arrow-symbol">→</span>
                    </div>
                  </div>

                </div>
                {/* Micro-Interaction Card Corner Hover Line */}
                <div className="card-hover-border-accent-line"></div>
              </button>

            </div>

            {/* Subtle Brand Disclaimer and Assurance block */}
            <div className="salon-brand-assurance-footer-notice">
              <div className="assurance-shield-icon-wrapper">
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" stroke="#c2185b" strokeWidth="1.5">
                  <path d="M8 1L1 4V9C1 13.42 4 17.5 8 18C12 17.5 15 13.42 15 9V4L8 1Z" />
                </svg>
              </div>
              <p className="assurance-notice-text-content">
                Your direct mobile reach out is entirely unspammed. Data remains rigorously protected under strict internal privacy parameters.
              </p>
            </div>

          </div>

        </section>

        {/* ==========================================
            SECTION 3: ACCORDION BASED FAQ INTERFACE
           ========================================== */}
        <section 
          className={`salon-faq-accordion-section-block ${animatedElements.includes('faqs') ? 'fade-slide-up-active' : 'fade-slide-up-hidden'}`}
        >
          <div className="faq-section-header-alignment">
            <span className="faq-mini-pretitle">Common Clarifications</span>
            <h2 className="faq-main-section-title">Frequently Asked Questions</h2>
            <div className="horizontal-decorative-divider-bar"></div>
          </div>

          <div className="faq-accordion-structural-container-wrapper">
            {premiumFaqs.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className={`faq-accordion-individual-row-item ${isOpen ? 'accordion-row-state-expanded' : 'accordion-row-state-collapsed'}`}
                >
                  <button
                    type="button"
                    className="faq-accordion-trigger-button-element"
                    onClick={() => toggleFaqAccordion(faq.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text-node">{faq.question}</span>
                    <span className={`faq-accordion-plus-minus-cross-indicator ${isOpen ? 'indicator-rotated-x' : ''}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </button>

                  <div 
                    className="faq-accordion-hidden-collapsible-panel-wrapper"
                    style={{ 
                      maxHeight: isOpen ? '250px' : '0px',
                      opacity: isOpen ? 1 : 0,
                      visibility: isOpen ? 'visible' : 'hidden'
                    }}
                  >
                    <div className="faq-accordion-inner-body-padded-content">
                      <p className="faq-answer-paragraph-render-node">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
};

export default Contact;