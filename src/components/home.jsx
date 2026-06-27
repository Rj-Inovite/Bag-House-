import React, { useState, useEffect, useRef } from 'react';
import './Home.css';

// Custom Hook to count numbers upward when scrolled into view
const useCounter = (endValue, duration = 2000, startTrigger = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startTrigger) return;
    let start = 0;
    const increment = endValue / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [endValue, duration, startTrigger]);

  return count;
};

const Home = () => {
  /* ==========================================================================
     STATE MANAGEMENT & REF HOOKS
     ========================================================================== */
  // Hero Slider
  const [currentSlide, setCurrentSlide] = useState(0);
  // Stats Animation Trigger
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  // Modal State for Gallery
  const [activeModalImg, setActiveModalImg] = useState(null);
  // Testimonial Carousel
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // 5 Premium Hero Slide Images (Unsplash placeholders curated for Dior/Nykaa Luxe aesthetic)
  const heroSlides = [
    'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1600&q=80'
  ];

  const services = [
    { title: 'Bridal Makeup', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80', desc: 'Exquisite, royal, HD & Airbrush bridal options crafted to radiate your pure essence.', icon: '👑' },
    { title: 'Party Makeup', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80', desc: 'Flawless red-carpet lookbook designs customized for high-fashion galas.', icon: '✨' },
    { title: 'Hair Styling', img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80', desc: 'Avant-garde couture cuts, global balayage transformations, and luxury extensions.', icon: '💇‍♀️' },
    { title: 'Hair Spa', img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80', desc: 'Deep molecular repair therapies with micro-mist botanical treatments.', icon: '🍃' },
    { title: 'Facial & Skin Care', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80', desc: 'Cellular glow facials utilizing 24K pure gold flakes and microcurrent lifting.', icon: '🧪' },
    { title: 'Nail Art', img: 'https://images.unsplash.com/photo-1604654894610-df490651e56c?auto=format&fit=crop&w=600&q=80', desc: 'Premium gel extensions, overlay details, and custom hand-painted aesthetics.', icon: '💅' }
  ];

  const testimonials = [
    { text: "The look well experience is pure poetry. From the champagne welcome to the master artist's stroke, my bridal look was stunningly royal.", author: "Aria Montgomery", role: "Vogue India Editor", rating: 5, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
    { text: "Unmatched cleanliness and pure luxury. Their 24K cellular glow skincare treatment turned my complexion radiant ahead of Paris Fashion Week.", author: "Elena Rostova", role: "International Model", rating: 5, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1604654894610-df490651e56c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1526045472252-706d3c829f30?auto=format&fit=crop&w=600&q=80'
  ];

  /* ==========================================================================
     INTERSECTION OBSERVER SETUP (SCROLL-DRIVEN REVEAL SYSTEM)
     ========================================================================== */
  useEffect(() => {
    // 1. Auto Slide Interval for Hero
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);

    // 2. Auto Slide Interval for Testimonials
    const testInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    // 3. Scroll Reveal System using Intersection Observer
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('luxe-reveal--active');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const blocks = document.querySelectorAll('.luxe-reveal');
    blocks.forEach((b) => scrollObserver.observe(b));

    // 4. Stats Counter Trigger Observer
    const statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) statsObserver.observe(statsRef.current);

    return () => {
      clearInterval(slideInterval);
      clearInterval(testInterval);
      blocks.forEach((b) => scrollObserver.unobserve(b));
      if (statsRef.current) statsObserver.unobserve(statsRef.current);
    };
  }, [heroSlides.length, testimonials.length]);

  return (
    <div className="luxe-home">
      {/* BACKGROUND FLOATING AMBIENCE */}
      <div className="ambient-sparkles" aria-hidden="true">
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
      </div>

      {/* ==========================================================================
         SECTION 1: LUXURY HERO BANNER (100VH AUTO SLIDER)
         ========================================================================== */}
      <section className="luxe-hero" id="hero">
        {heroSlides.map((slide, index) => (
          <div 
            key={index} 
            className={`luxe-hero__slide ${index === currentSlide ? 'luxe-hero__slide--active' : ''}`}
            style={{ backgroundImage: `url(${slide})` }}
          >
            <div className="luxe-hero__overlay"></div>
          </div>
        ))}

        <div className="luxe-hero__content-container">
          <span className="luxe-hero__subtitle">Where Elegance Meets Perfection</span>
          <h1 className="luxe-hero__title">Reveal Your <br /><span className="title-script">True Beauty</span></h1>
          <p className="luxe-hero__desc">
            Experience luxury bridal makeup, premium skincare, glamorous hairstyling and timeless beauty crafted especially for you.
          </p>
          <div className="luxe-hero__actions">
            <button className="luxe-btn luxe-btn--glow">Book Appointment</button>
            <button className="luxe-btn luxe-btn--border">Explore Services</button>
          </div>
        </div>

        {/* Navigation Elements */}
        <button className="slider-arrow arrow-left" onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))} aria-label="Previous Slide">‹</button>
        <button className="slider-arrow arrow-right" onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)} aria-label="Next Slide">›</button>

        <div className="slider-dots">
          {heroSlides.map((_, idx) => (
            <button 
              key={idx} 
              className={`dot ${idx === currentSlide ? 'dot--active' : ''}`} 
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator" aria-hidden="true">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 2: WELCOME SECTION (SPLIT LAYOUT WITH COUNTERS)
         ========================================================================== */}
      <section className="welcome luxe-reveal" ref={statsRef}>
        <div className="welcome__container">
          <div className="welcome__left">
            <div className="welcome__img-frame">
              <img src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80" alt="Luxury Salon Ambience" loading="lazy" />
            </div>
          </div>
          <div className="welcome__right">
            <span className="section-pre">Welcome to Look Well Parlor</span>
            <h2 className="section-heading">An Oasis of Royal Heritage & Aesthetics</h2>
            <p className="section-paragraph">
              Step into an opulent universe inspired by high-fashion Parisian couture ateliers. Our handpicked beauty artisans deliver meticulous bespoke styling services backed by state-of-the-art scientific aesthetic technology.
            </p>
            <div className="welcome__stats-row">
              <div className="stat-unit">
                <h3>{useCounter(15, 2000, statsVisible)}+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-unit">
                <h3>{useCounter(5000, 2500, statsVisible)}+</h3>
                <p>Happy Clients</p>
              </div>
              <div className="stat-unit">
                <h3>{useCounter(100, 1800, statsVisible)}+</h3>
                <p>Bridal Makeovers</p>
              </div>
              <div className="stat-unit">
                <h3>{useCounter(50, 1500, statsVisible)}+</h3>
                <p>Beauty Experts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 3: OUR PREMIUM SERVICES (6 GLASSMORPHISM CARDS)
         ========================================================================== */}
      <section className="services-grid luxe-reveal">
        <div className="global-header">
          <span className="section-pre">Signature Treatments</span>
          <h2 className="section-heading">Our Premium Services</h2>
        </div>
        <div className="services-grid__container">
          {services.map((service, index) => (
            <div key={index} className="service-luxe-card">
              <div className="service-luxe-card__visual">
                <img src={service.img} alt={service.title} loading="lazy" />
                <span className="service-luxe-card__icon">{service.icon}</span>
              </div>
              <div className="service-luxe-card__body">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <button className="card-inline-btn">Learn More <span>→</span></button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="why-us luxe-reveal">
        <div className="why-us__container">
          <div className="global-header">
            <span className="section-pre">Pure Artistry</span>
            <h2 className="section-heading">Why Choose Look Well</h2>
          </div>
          <div className="why-us__grid">
            <div className="why-card">
              <div className="why-card__badge">🎖️</div>
              <h3>Certified Artists</h3>
              <p>Trainers credentialed by elite beauty institutions worldwide.</p>
            </div>
            <div className="why-card">
              <div className="why-card__badge">🧴</div>
              <h3>Luxury Products</h3>
              <p>Formulations sourced straight from Dior and Charlotte Tilbury.</p>
            </div>
            <div className="why-card">
              <div className="why-card__badge">✨</div>
              <h3>100% Hygiene</h3>
              <p>Autoclave sterilization standards surpassing modern regulations.</p>
            </div>
            <div className="why-card">
              <div className="why-card__badge">💎</div>
              <h3>Affordable Luxury</h3>
              <p>Bespoke upscale micro-pricing tailored to multi-tiered options.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 5: OUR PREMIUM COLLECTION (HORIZONTAL CARDS)
         ========================================================================== */}
      <section className="premium-collection luxe-reveal">
        <div className="global-header">
          <span className="section-pre">Curated Couture Products</span>
          <h2 className="section-heading">Our Premium Collection</h2>
        </div>
        <div className="premium-collection__wrapper">
          <div className="horizontal-luxe-card">
            <div className="horizontal-luxe-card__img-side">
              <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=80" alt="Skin Serum Collection" loading="lazy" />
              <div className="horizontal-gradient-overlay"></div>
            </div>
            <div className="horizontal-luxe-card__content-side">
              <h3>The Golden Elixir Routine</h3>
              <p>Discover cellular micro-rejuvenation formulas curated specifically for avant-garde pre-nuptial skin glow radiance mapping.</p>
              <button className="luxe-btn luxe-btn--glow">Explore Collection</button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 6: BRIDAL MAKEOVER GALLERY (MASONRY LAYOUT WITH MODAL)
         ========================================================================== */}
      <section className="masonry-gallery luxe-reveal">
        <div className="global-header">
          <span className="section-pre">The Look Book Portfolio</span>
          <h2 className="section-heading">Bridal Makeover Gallery</h2>
        </div>
        <div className="masonry-gallery__grid">
          {galleryImages.map((src, idx) => (
            <div key={idx} className="masonry-item" onClick={() => setActiveModalImg(src)}>
              <img src={src} alt={`Bridal Showcase ${idx + 1}`} loading="lazy" />
              <div className="masonry-item__hover-overlay">
                <span>View Cinematic Masterpiece</span>
              </div>
            </div>
          ))}
        </div>

        {/* LIGHTBOX MODAL */}
        {activeModalImg && (
          <div className="luxe-modal" onClick={() => setActiveModalImg(null)} role="dialog" aria-modal="true">
            <button className="luxe-modal__close" onClick={() => setActiveModalImg(null)} aria-label="Close modal">&times;</button>
            <img src={activeModalImg} alt="Enlarged Portrait Lookbook" />
          </div>
        )}
      </section>

      {/* ==========================================================================
         SECTION 7: TESTIMONIALS (LUXURY GLASSMORPHISM CAROUSEL)
         ========================================================================== */}
      <section className="testimonials-section luxe-reveal">
        <div className="global-header">
          <span className="section-pre">Testimonials</span>
          <h2 className="section-heading text-white">Loved By Connoisseurs</h2>
        </div>
        <div className="testimonials-section__wrapper">
          {testimonials.map((t, idx) => (
            <div key={idx} className={`testimonial-luxe-card ${idx === currentTestimonial ? 'testimonial-luxe-card--active' : ''}`}>
              <div className="quote-mark">“</div>
              <p className="testimonial-quote">{t.text}</p>
              <div className="testimonial-rating">
                {Array.from({ length: t.rating }).map((_, i) => <span key={i}>★</span>)}
              </div>
              <div className="testimonial-profile">
                <img src={t.img} alt={t.author} loading="lazy" />
                <div>
                  <h4>{t.author}</h4>
                  <p>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================================================
         SECTION 8: SPECIAL OFFERS (SPARKLED GRADIENT BANNER)
         ========================================================================== */}
      <section className="special-offers luxe-reveal">
        <div className="special-offers__banner">
          <div className="floating-flower decorative-f1">🌸</div>
          <div className="floating-flower decorative-f2">🌸</div>
          <span className="offer-badge">Seasonal Radiance Luxury Offer</span>
          <h2>30% OFF <br /><span className="offer-sub">On Complete Bridal Luxury Packages</span></h2>
          <p>Book your virtual consultation timeline today to reserve premium signature access slots.</p>
          <button className="luxe-btn luxe-btn--glow shine-animation">Book Now</button>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 9: BOOK APPOINTMENT CTA (ROSE GOLD BLOCK)
         ========================================================================== */}
      <section className="appointment-cta luxe-reveal">
        <div className="appointment-cta__box">
          <h2>Indulge In Royal Self Care</h2>
          <p>Your transformation sequence begins here. Select your custom date slot online.</p>
          <button className="luxe-btn luxe-btn--dark-glow">Book Appointment</button>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 10: INSTAGRAM GALLERY (CONTINUOUS INFINITE SLIDER)
         ========================================================================== */}
      <section className="instagram-ticker">
        <div className="instagram-ticker__infinite-track">
          {/* Double map to execute smooth non-breaking infinite loop layout marquee */}
          {[...galleryImages, ...galleryImages].map((src, idx) => (
            <div key={idx} className="ticker-img-card">
              <img src={src} alt="Instagram Live Lookbook Grid" loading="lazy" />
              <div className="insta-icon-overlay">📸</div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================================================
         SECTION 11: LOCATION & SCHEDULING INTERFACE
         ========================================================================== */}
      <section className="location-section luxe-reveal">
        <div className="location-section__container">
          <div className="location-info">
            <span className="section-pre">Visit Our Parlor</span>
            <h2>Flagship Luxury Lounge</h2>
            <p className="address">📍 77 Royal Crest Boulevard, Nykaa Luxe District, Block-A, Mumbai</p>
            <div className="hours-block">
              <h3>Working Hours</h3>
              <p>Monday – Saturday: 09:00 AM – 09:00 PM</p>
              <p>Sunday: 10:00 AM – 06:00 PM</p>
            </div>
            <button className="luxe-btn luxe-btn--glow">Call Salon</button>
          </div>
          <div className="location-map">
            {/* Elegant luxury placeholder design embedded for premium UI map component */}
            <div className="map-placeholder">
              <div className="map-pin"></div>
              <p>Google Maps Structural Layer Integrated</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 12: FOOTER PREVIEW & NEWSLETTER
         ========================================================================== */}
      <footer className="luxe-footer">
        <div className="luxe-footer__top">
          <div className="footer-col col-brand">
            <h2 className="footer-logo">Look Well</h2>
            <p>Crafting magical red carpet narratives and timeless beauty aesthetics since 2011.</p>
            <div className="footer-socials">
              <a href="#instagram" aria-label="Instagram">IG</a>
              <a href="#facebook" aria-label="Facebook">FB</a>
              <a href="#pinterest" aria-label="Pinterest">PIN</a>
            </div>
          </div>
          <div className="footer-col col-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#services">Our Premium Services</a></li>
              <li><a href="#collection">Collection Lookbook</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col col-newsletter">
            <h3>Newsletter</h3>
            <p>Subscribe to secure premium priority event slots and styling drops.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your Luxury Email" aria-label="Email address input" />
              <button aria-label="Submit subscription">Join</button>
            </div>
          </div>
        </div>
        <div className="luxe-footer__bottom">
          <p>&copy; 2026 Look Well Parlor. Developed in Absolute Luxury. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;