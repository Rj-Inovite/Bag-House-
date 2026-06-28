import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

/**
 * Home.jsx — Look Well Parlor
 * ------------------------------------------------------------------
 * Royal pink & white editorial system — the same design language as
 * Premium.jsx / Footer.jsx, so the whole site reads as one brand:
 * --rose-50  #FFF6F8   warm white background
 * --rose-100 #FCE4EC   soft fills
 * --rose-300 #F3A6C2   mid accent
 * --rose-500 #E0457B   primary rose — the named "signature pink":
 * deep enough to feel premium, warm enough to
 * feel inviting, never pastel and never maroon
 * --rose-700 #B22F5C   deep accent / hover
 * --ink      #2B1620   warm near-black text
 * --gold     #C9A24B   metallic accent — reserved for the owner
 * spotlight, used sparingly as the one place
 * gold is "allowed" to appear
 * Display type: "Fraunces" (heavy weight). Body: "Inter".
 *
 * HERO CHOREOGRAPHY (the signature moment):
 * On load, "Welcome to Look Well Parlor" appears centered and large.
 * After a beat, the whole hero block animates into its resting
 * two-column position — text settling left, a portrait photograph
 * developing into view on the right — exactly once per visit.
 *
 * FULL-BLEED BANNER:
 * A second, dedicated section directly under the hero: one photo at
 * a time, full viewport width, soft crossfade every 3.2s.
 * ------------------------------------------------------------------
 */

// Reusable Custom Hook for Counting Numbers Upwards on Viewport Intersection
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
      STATE CONFIGURATIONS & INTERACTIVE SYSTEMS
     ========================================================================== */
  const [heroSettled, setHeroSettled] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [currentOffer, setCurrentOffer] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeModalImg, setActiveModalImg] = useState(null);
  const [activeFaq, setActiveFaq] = useState(0);

  const statsRef = useRef(null);

  /* ==========================================================================
      CONTENT — REAL, CURATED HIGH-END PARLOR PHOTOGRAPHY
     ========================================================================== */

  // The hero's single resting portrait: Regal Indian Bridal Profile
  const heroPortrait = {
    src: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop',
    alt: 'Traditional Indian bridal makeup look by Look Well Parlor',
  };

  // Full-bleed banner (rotates every 3.2s): Majestic close-ups and rich lehenga profiles
  const bannerSlides = [
    { src: 'https://previews.123rf.com/images/vectorpouch/vectorpouch1909/vectorpouch190900001/129678822-cosmetics-beauty-product-bottle-mockup-banner-on-gold-background-with-liquid-droplets-splash-skin.jpg', alt: 'Indian Bridal portrait with rich makeup and signature gold jewelry' },
    { src: 'https://www.shutterstock.com/image-photo/cheerful-young-woman-white-blouse-260nw-2212525959.jpg', alt: 'Glamorous festive reception makeup and hair look' },
    { src: 'https://static.vecteezy.com/system/resources/thumbnails/009/731/220/small/cosmetics-or-skin-care-product-ads-with-bottle-banner-ad-for-beauty-products-and-leaf-background-glittering-light-effect-design-vector.jpg', alt: 'Elegant premium makeup application detail close-up' },
  ];

  // Premium Custom Specific Service Images (Perfect Square Formats)
  const premiumServices = [
    { id: 's1', title: 'Bridal Makeup Masterpiece', img:'https://i.pinimg.com/474x/b6/1b/2b/b61b2b2e1b8e071bdef8e2f0c7361cd4.jpg', desc: 'Signature bridal looks with rich, long-lasting pigments and flawless finish.' },
    { id: 's3', title: 'Hair Care & Botanical Spa', img: 'https://static.vecteezy.com/system/resources/thumbnails/018/932/579/small/professional-hairdresser-washing-hair-of-young-woman-in-beauty-salon-photo.JPG', desc: 'Deep molecular hydration therapies utilizing rich micro-mist infusions.' },  
     { id: 's4', title: 'Advanced Facial Therapies', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&h=600&q=80', desc: 'Cellular glow restoration routines leveraging signature European lifting mechanics.' },
    { id: 's5', title: 'Luxury Nail & Custom Mehndi', img: 'data:image/jpeg;base64,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', desc: 'Premium custom nail extension architectures combined with intricate bridal art.' },
    { id: 's6', title: 'Dermal Skin Care Management', img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&h=600&q=80', desc: 'Hydration maps executed perfectly to cultivate long-lasting silk skin tone.'},
    { id: 's7', title: 'Precision Sculpting & Threading', img: 'data:image/jpeg;base64,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', desc: 'Meticulous eyebrow mathematical configuration from senior parlor specialists.' },
  ];

  // Aesthetics Lookbook: High-end cosmetic elements, lipsticks, and luxury tools
  const lookbookCosmetics = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgqsBRrCItMxAeaxNnuHa7WFgJ2KhFeDXTVq-fxOqpwA&s=10',
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp7UVI3FtYEbth4WwdS21fLeNnye5kGK0vAUacmI8OHw&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpuPP6A-OPrKBBW3y8_orCZ2Giy39kR5Fb78kdp5GIpQ&s=10',
     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD59-Ogd1EsEnooAorKU78TyiOXsJrcudY1DNRtHm3hQ&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSU7C2mKRAVcnvXf2Ncm6I7P99ognh0-21BV-QA5mKpQ&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlCvxsVK3oY3ndqd_bnUbB1FjJJSrpB2KQLvtWU3z_nQ&s=10',
  ];

  const premiumOffers = [
    { text: 'Couture bridal makeup flats — 20% off this season', sub: 'Limited priority reservation slots open • Experience the signature touch' },
    { text: 'Glow revival event — complimentary facial mask included', sub: 'Formulated with pure elite botanical layers for your absolute satisfaction' },
    { text: 'Hair luxury essentials — up to 25% off spa & balayage combos', sub: 'Indulge in royal self-care maps curated directly by senior style directors' },
  ];

  const clientReviews = [
    { text: "Every visit here feels like stepping into a high-fashion palace. Ruchi's technical precision on my bridal lookbook was breathtaking.", client: 'Aria Montgomery', designation: 'Luxury Content Director', rating: 5, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
    { text: "The perfect balance of rich rose tones and immaculate cleanliness. My skin transformation after the cellular facial was immediate.", client: 'Elena Rostova', designation: 'Elite Fashion Columnist', rating: 5, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
  ];

  const luxuryFaqs = [
    { q: 'What premium cosmetic houses do you source your application layers from?', a: 'We deal strictly in premium authentic products sourced straight from luxury lines like Charlotte Tilbury, Dior, and NARS to assure long-lasting skin integrity.' },
    { q: 'How do I secure an exclusive bridal consultation slot directly with Ruchi Jasmatiya?', a: 'You can book directly using our online platform interface or message us on WhatsApp for an instant reply from our team.' },
    { q: 'Do you offer full multi-tiered customization tracks for destination weddings?', a: 'Yes, our team maps out complete bespoke beauty trajectories tailored meticulously to destination event environments.' },
  ];

  /* ==========================================================================
      AUTOMATED CYCLES & SCROLL REVEAL TRIGGERS
     ========================================================================== */
  useEffect(() => {
    // Hero settles into its resting layout once, shortly after load
    const settleTimer = setTimeout(() => setHeroSettled(true), 900);

    const bannerCycle = setInterval(() => {
      setCurrentBanner((p) => (p + 1) % bannerSlides.length);
    }, 3200);

    const stripCycle = setInterval(() => {
      setCurrentOffer((p) => (p + 1) % premiumOffers.length);
    }, 3600);

    const feedbackCycle = setInterval(() => {
      setCurrentTestimonial((p) => (p + 1) % clientReviews.length);
    }, 5500);

    const viewportObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('luxe-reveal--active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    const components = document.querySelectorAll('.luxe-reveal');
    components.forEach((c) => viewportObserver.observe(c));

    const metricsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (statsRef.current) metricsObserver.observe(statsRef.current);

    return () => {
      clearTimeout(settleTimer);
      clearInterval(bannerCycle);
      clearInterval(stripCycle);
      clearInterval(feedbackCycle);
      components.forEach((c) => viewportObserver.unobserve(c));
      if (statsRef.current) metricsObserver.unobserve(statsRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="parlor-architecture-wrapper">

      {/* ==========================================================================
          SECTION 0: HERO — choreographed centre-to-settled entrance
         ========================================================================== */ }
      <section className={`luxe-hero ${heroSettled ? 'luxe-hero--settled' : 'luxe-hero--center'}`} id="hero-hub">
        <div className="luxe-hero__glow" aria-hidden="true"></div>

        <div className="luxe-hero__stage">
          <div className="luxe-hero__copy">
            <span className="luxe-hero__eyebrow">Royal Beauty &amp; Bridal Atelier</span>
            <h1 className="luxe-hero__title">
              Welcome to<br />
              <span className="luxe-hero__title-pink">Look Well Parlor</span>
            </h1>
            <p className="luxe-hero__tagline">
              Where every face tells a more radiant story.
            </p>
            <p className="luxe-hero__desc">
              A premium beauty atelier for bridal artistry, skin therapy, and
              high-fashion styling — mapped precisely around you, finished
              with a touch only Look Well gives.
            </p>
            <div className="luxe-hero__actions">
              <Link to="/premium" className="luxe-btn luxe-btn--glow-pink">
                View Our Work <span>→</span>
              </Link>
              <a href="#premium-services" className="luxe-btn luxe-btn--ghost-ink">
                Explore Services
              </a>
            </div>
          </div>

          <div className="luxe-hero__visual">
            <div className="luxe-hero__portrait-frame">
              <img src={heroPortrait.src} alt={heroPortrait.alt} />
            </div>
            <div className="luxe-hero__badge">
              <span className="luxe-hero__badge-stars">★★★★★</span>
              <span>Trusted since 2011</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 0.5: FULL-BLEED ROTATING BANNER (3.2s crossfade)
         ========================================================================== */}
      <section className="full-banner" aria-label="Look Well Parlor lookbook highlights">
        {bannerSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`full-banner__slide ${idx === currentBanner ? 'full-banner__slide--active' : ''}`}
            style={{ backgroundImage: `url(${slide.src})` }}
            role="img"
            aria-label={slide.alt}
          />
        ))}
        <div className="full-banner__veil" aria-hidden="true"></div>
        <div className="full-banner__caption">
          <span className="full-banner__caption-eyebrow">From the Lookbook</span>
          <p>Real finishes, real radiance — one look every few seconds.</p>
        </div>
        <div className="full-banner__dots">
          {bannerSlides.map((_, dotIndex) => (
            <button
              key={dotIndex}
              className={`full-banner__dot ${dotIndex === currentBanner ? 'full-banner__dot--active' : ''}`}
              onClick={() => setCurrentBanner(dotIndex)}
              aria-label={`Show banner image ${dotIndex + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ==========================================================================
          SECTION 2: PREMIUM SERVICE MODULES SYSTEM (SEAMLESS SQUARE CARDS)
         ========================================================================== */}
      <section className="services-grid luxe-reveal" id="premium-services">
        <div className="global-header">
          <span className="section-pre">Bespoke Treatments</span>
          <h2 className="section-heading">Our Premium Services</h2>
          <div className="header-underline-accent"></div>
        </div>
        <div className="services-grid__container">
          {premiumServices.map((service) => (
            <div key={service.id} className="service-luxe-card">
              <div className="service-luxe-card__visual">
                <img src={service.img} alt={service.title} loading="lazy" />
                <span className="service-luxe-card__icon-badge">{service.icon}</span>
              </div>
              <div className="service-luxe-card__body">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <button className="card-inline-btn-magenta">Inquire Details <span>→</span></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================================================
          SECTION 3: TIMED INTERACTIVE OFFERS STRIP
         ========================================================================== */}
      <section className="interactive-ticker-strip">
        <div className="ticker-strip-wrapper">
          {premiumOffers.map((offer, offerIndex) => (
            <div
              key={offerIndex}
              className={`ticker-offer-slide ${offerIndex === currentOffer ? 'ticker-offer-slide--active' : ''}`}
            >
              <h2>{offer.text}</h2>
              <p>{offer.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================================================
          SECTION 4: WHY CHOOSE LOOK WELL (5 PILLARS)
         ========================================================================== */}
      <section className="why-us-pillars luxe-reveal">
        <div className="why-us__container">
          <div className="global-header">
            <span className="section-pre">The Luxury Benchmark</span>
            <h2 className="section-heading">Why Choose Look Well?</h2>
            <div className="header-underline-accent"></div>
          </div>
          <div className="why-us__grid-five">
            <div className="why-card-five">
              <div className="why-badge-dark-pink">👑</div>
              <h3>We Are Expert</h3>
              <p>Certified elite master technicians guiding style evolutions.</p>
            </div>
            <div className="why-card-five">
              <div className="why-badge-dark-pink">💄</div>
              <h3>Premium Product</h3>
              <p>Exclusively authentic global luxury cosmetics portfolios.</p>
            </div>
            <div className="why-card-five">
              <div className="why-badge-dark-pink">🧼</div>
              <h3>Hygiene Standards</h3>
              <p>Strict non-negotiable autoclave tool medical sterilization protocols.</p>
            </div>
            <div className="why-card-five">
              <div className="why-badge-dark-pink">👩</div>
              <h3>Only For Ladies</h3>
              <p>A completely private, secure, and peaceful beauty lounge environment.</p>
            </div>
            <div className="why-card-five">
              <div className="why-badge-dark-pink">❤️</div>
              <h3>Customer Satisfaction</h3>
              <p>Meticulous attention to your custom aesthetic profile guidelines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 5: LUXURY COSMETICS SHOWCASE GRID
         ========================================================================== */}
      <section className="cosmetics-showcase luxe-reveal">
        <div className="global-header">
          <span className="section-pre">The Visual Palette Portfolio</span>
          <h2 className="section-heading">Bespoke Aesthetics Gallery</h2>
          <div className="header-underline-accent"></div>
        </div>
        <div className="cosmetics-showcase__grid">
          {lookbookCosmetics.map((src, imgIdx) => (
            <div key={imgIdx} className="cosmetic-square-item" onClick={() => setActiveModalImg(src)}>
              <img src={src} alt={`Cosmetic palette ${imgIdx + 1}`} loading="lazy" />
              <div className="cosmetic-square-item__overlay">
                <span>Expand Look 🔍</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================================================
          SECTION 6: FLAGSHIP OWNER SPOTLIGHT (RUCHI JASMATIYA) — gold accent
         ========================================================================== */}
      <section className="owner-spotlight luxe-reveal" id="owner-bio-hub">
        <div className="owner-spotlight__container">
          <div className="owner-spotlight__left-content">
            <span className="section-pre owner-pre">The Master Artisan Behind The Vision</span>
            <h2 className="owner-title">Ruchi Jasmatiya</h2>
            <span className="owner-subtitle">Founder &amp; Lead Aesthetic Architect</span>
            <p className="owner-bio">
              With a distinguished career mapping high-end bridal architecture, Ruchi Jasmatiya established Look Well Parlor to inject couture artistic precision into traditional event makeovers.
            </p>
            <p className="owner-bio">
              Her technical layouts prioritize long-lasting skin integration, vivid eye shadow composition fields, and customized facial hydration textures. Under her leadership, Look Well sets a premier standard for customized beauty services.
            </p>
            <div className="owner-signature-row">
              <span className="owner-signature-script">Ruchi Jasmatiya</span>
              <span className="owner-signature-divider"></span>
              <span className="owner-signature-label">Founder, Look Well Parlor</span>
            </div>
            <Link to="/contact" className="luxe-btn luxe-btn--glow-pink owner-cta">
              Book Priority Consultation
            </Link>
          </div>
          <div className="owner-spotlight__right-visual">
            <div className="owner-image-frame">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" alt="Ruchi Jasmatiya, Founder of Look Well Parlor" />
              <div className="frame-signature-badge">
                <span className="frame-signature-badge__crown" aria-hidden="true"></span>
                Look Well Director
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 7: CLIENT EXPERIENCE MATRIX & ACCUMULATED COUNTERS
         ========================================================================== */}
      <section className="testimonials-section luxe-reveal" ref={statsRef}>
        <div className="global-header">
          <span className="section-pre section-pre--on-dark">Connoisseur Feedback</span>
          <h2 className="section-heading text-white">Loved By Connoisseurs</h2>
        </div>
        <div className="testimonials-section__wrapper">
          {clientReviews.map((review, rIdx) => (
            <div key={rIdx} className={`testimonial-luxe-card ${rIdx === currentTestimonial ? 'testimonial-luxe-card--active' : ''}`}>
              <div className="quote-mark">&ldquo;</div>
              <p className="testimonial-quote">{review.text}</p>
              <div className="testimonial-rating">
                {Array.from({ length: review.rating }).map((_, starIdx) => <span key={starIdx}>★</span>)}
              </div>
              <div className="testimonial-profile">
                <img src={review.avatar} alt={review.client} loading="lazy" />
                <div>
                  <h4>{review.client}</h4>
                  <p>{review.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* COUNTER GRID ROW EMBEDDED SAFELY AT SECTION BASE */}
        <div className="embedded-stats-row">
          <div className="embed-stat">
            <h4>{useCounter(1000, 2500, statsVisible)}+</h4>
            <p>Happy Customers</p>
          </div>
          <div className="embed-stat">
            <h4>{useCounter(15, 1800, statsVisible)}+</h4>
            <p>Years Experience</p>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SECTION 8: PARLOR CONCIERGE FAQ SECTION
         ========================================================================== */}
      <section className="luxe-faq-accordion luxe-reveal">
        <div className="global-header">
          <span className="section-pre">Common Inquiries</span>
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div className="header-underline-accent"></div>
        </div>
        <div className="faq-accordion-container">
          {luxuryFaqs.map((faq, faqIdx) => (
            <div
              key={faqIdx}
              className={`faq-item-block ${activeFaq === faqIdx ? 'faq-item-block--active' : ''}`}
              onClick={() => setActiveFaq(activeFaq === faqIdx ? null : faqIdx)}
            >
              <div className="faq-item-header">
                <h3>{faq.q}</h3>
                <span className="faq-toggle-icon">{activeFaq === faqIdx ? '−' : '+'}</span>
              </div>
              <div className="faq-item-body">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL CONTAINER */}
      {activeModalImg && (
        <div className="luxe-modal" onClick={() => setActiveModalImg(null)} role="dialog" aria-modal="true">
          <button className="luxe-modal__close" onClick={() => setActiveModalImg(null)} aria-label="Close image">&times;</button>
          <img src={activeModalImg} alt="Enlarged lookbook view" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};

export default Home;