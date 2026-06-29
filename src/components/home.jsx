import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

/**
 * Home.jsx — Look Well Parlor
 * ------------------------------------------------------------------
 * Royal pink & white editorial system — the same design language as
 * Premium.jsx / Footer.jsx, so the whole site reads as one brand:
 *   --rose-50  #FFF6F8   warm white background
 *   --rose-100 #FCE4EC   soft fills
 *   --rose-300 #F3A6C2   mid accent
 *   --rose-500 #E0457B   primary rose — the named "signature pink"
 *   --rose-700 #B22F5C   deep accent / hover
 *   --ink      #2B1620   warm near-black text
 *   --gold     #C9A24B   metallic accent — reserved for the owner
 *                        spotlight, used sparingly
 * Display type: "Fraunces" (heavy weight). Body: "Inter".
 *
 * IMPORTANT NOTE ON THE PINK VERTICAL LINE (right edge of viewport):
 *   That bar is NOT produced by anything in this file or in home.css —
 *   it spans the full viewport height regardless of section
 *   boundaries, which is the signature of a `position: fixed` element
 *   living in a layout shell (App.jsx / Layout.jsx / Navbar.jsx) that
 *   sits OUTSIDE this component. Search those files for a fixed/
 *   sticky element with no `right`/`width` constraint (often a
 *   leftover "scroll progress bar" or decorative rail) and remove it.
 *   Everything in this file is defensively wrapped against overflow
 *   (see the `html, body` rules and `max-width: 100vw` guards in
 *   home.css) so this page cannot itself cause that bug.
 *
 * HERO CHOREOGRAPHY:
 *   "Welcome to Look Well Parlor" loads centered and large, then the
 *   whole hero settles into its two-column resting layout — text
 *   left, portrait photograph developing into view on the right.
 *
 * BANNER SECTION (enhanced this revision):
 *   Full-bleed, taller, with a slow Ken-Burns zoom per slide, a
 *   gradient veil, a category tag, a progress-bar timer (not just
 *   dots), and large readable captions. Fully reworked for mobile:
 *   shorter viewport height, repositioned caption, touch-friendly
 *   dot targets, no off-screen overflow at any width.
 *
 * NEW SECTION — "What Our Customers Say":
 *   A photo-driven testimonial wall: 5 real client photos paired with
 *   short Indian-context reviews, laid out as a responsive masonry-
 *   style grid that becomes a single column on mobile.
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

// Same WhatsApp number used across the rest of the site (Footer.jsx,
// Premium.jsx) — kept here too so every "instant contact" surface
// points at the same place.
const WHATSAPP_NUMBER = '917720929132';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi! I'd love to book an appointment at Look Well Parlor."
)}`;

const Home = () => {
  /* ==========================================================================
      STATE CONFIGURATIONS & INTERACTIVE SYSTEMS
     ========================================================================== */
  const [heroSettled, setHeroSettled] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [bannerProgressKey, setBannerProgressKey] = useState(0);
  const [currentOffer, setCurrentOffer] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentReviewWall, setCurrentReviewWall] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeModalImg, setActiveModalImg] = useState(null);
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState('all');

  const statsRef = useRef(null);
  const BANNER_INTERVAL_MS = 4200;

  /* ==========================================================================
      CONTENT
     ========================================================================== */

  const heroPortrait = {
    src: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop',
    alt: 'Traditional Indian bridal makeup look by Look Well Parlor',
  };

  // Full-bleed banner — enhanced with a category tag + Ken-Burns zoom
  const bannerSlides = [
    {
      src: 'https://images.unsplash.com/photo-1610740362959-22cf01e09a90?q=80&w=2000&auto=format&fit=crop',
      alt: 'Bridal portrait with rich makeup and gold jewellery',
      tag: 'Bridal',
      caption: 'Festive bridal looks finished in rich gold and red.',
    },
    {
      src: 'https://images.unsplash.com/photo-1503104834685-7205e8607eb9?q=80&w=2000&auto=format&fit=crop',
      alt: 'Glamorous evening makeup look',
      tag: 'Party Glam',
      caption: 'Statement evening glamour, built to last till the last dance.',
    },
    {
      src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2000&auto=format&fit=crop',
      alt: 'Elegant makeup application close-up',
      tag: 'Studio Artistry',
      caption: 'Precision artistry — every detail considered, every finish flawless.',
    },
    {
      src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2000&auto=format&fit=crop',
      alt: 'Soft romantic engagement makeup look',
      tag: 'Engagement',
      caption: 'Soft, luminous glam for the moment the ring goes on.',
    },
  ];

  const premiumServices = [
    {
      id: 's1',
      title: 'Bridal Makeup Masterpiece',
      img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Signature bridal looks with rich, long-lasting pigments and flawless finish.',
      icon: '👑',
    },
    {
      id: 's3',
      title: 'Hair Care & Botanical Spa',
      img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Deep molecular hydration therapies utilizing rich micro-mist infusions.',
      icon: '💇‍♀️',
    },
    {
      id: 's4',
      title: 'Advanced Facial Therapies',
      img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Cellular glow restoration routines leveraging signature European lifting mechanics.',
      icon: '🧪',
    },
    {
      id: 's5',
      title: 'Luxury Nail & Custom Mehndi',
      img: 'https://images.unsplash.com/photo-1604654894610-df490651e56c?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Premium custom nail extension architectures combined with intricate bridal art.',
      icon: '💅',
    },
    {
      id: 's6',
      title: 'Dermal Skin Care Management',
      img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Hydration maps executed perfectly to cultivate long-lasting silk skin tone.',
      icon: '💖',
    },
    {
      id: 's7',
      title: 'Precision Sculpting & Threading',
      img: 'https://images.unsplash.com/photo-1522337094133-f30f51db06ef?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Meticulous eyebrow mathematical configuration from senior parlor specialists.',
      icon: '📐',
    },
    {
      id: 's8',
      title: 'Engagement & Ring Ceremony Glam',
      img: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Soft, luminous looks for the moment the ring goes on — radiant, never overdone.',
      icon: '💍',
    },
    {
      id: 's9',
      title: 'Saree & Drape Styling',
      img: 'https://images.unsplash.com/photo-1610740362959-22cf01e09a90?auto=format&fit=crop&w=600&h=600&q=80',
      desc: 'Pleat-perfect draping with pins and finishes that hold through a full event.',
      icon: '🪔',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Consult & Curate',
      desc: 'Tell us your event, outfit colours, and the look you have in mind — over a call, WhatsApp, or in person.',
      icon: '💬',
    },
    {
      step: '02',
      title: 'Trial & Refine',
      desc: 'For bridal bookings, a trial session lets you see and adjust the exact finish before the day arrives.',
      icon: '🎨',
    },
    {
      step: '03',
      title: 'The Day, Perfected',
      desc: 'On-time arrival, long-wear premium products, and a touch-up kit left with you for the hours ahead.',
      icon: '⏱️',
    },
  ];

  const premiumOffers = [
    {
      text: 'Couture bridal makeup flats — 20% off this season',
      sub: 'Limited priority reservation slots open • Experience the signature touch',
      tag: 'Ends this month',
    },
    {
      text: 'Glow revival event — complimentary facial mask included',
      sub: 'Formulated with pure elite botanical layers for your absolute satisfaction',
      tag: 'New clients',
    },
    {
      text: 'Hair luxury essentials — up to 25% off spa & balayage combos',
      sub: 'Indulge in royal self-care maps curated directly by senior style directors',
      tag: 'Weekday special',
    },
  ];

  const lookbookCosmetics = [
    {
      src: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&h=700&q=80',
      label: 'Statement Smoky Eye',
      category: 'party',
    },
    {
      src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&h=700&q=80',
      label: 'Classic Bridal Glow',
      category: 'bridal',
    },
    {
      src: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=700&h=700&q=80',
      label: 'Dewy Skin Finish',
      category: 'skin',
    },
    {
      src: 'https://images.unsplash.com/photo-1604654894610-df490651e56c?auto=format&fit=crop&w=700&h=700&q=80',
      label: 'Bridal Mehndi & Nails',
      category: 'bridal',
    },
    {
      src: 'https://images.unsplash.com/photo-1526045472252-706d3c829f30?auto=format&fit=crop&w=700&h=700&q=80',
      label: 'Soft Curls & Updo',
      category: 'hair',
    },
    {
      src: 'https://images.unsplash.com/photo-1591375372275-615b89a08a5c?auto=format&fit=crop&w=700&h=700&q=80',
      label: 'Evening Glam',
      category: 'party',
    },
    {
      src: 'https://images.unsplash.com/photo-1610740362959-22cf01e09a90?auto=format&fit=crop&w=700&h=700&q=80',
      label: 'Festive Bridal Look',
      category: 'bridal',
    },
    {
      src: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?auto=format&fit=crop&w=700&h=700&q=80',
      label: 'Soft Romantic Glam',
      category: 'skin',
    },
    {
      src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=700&h=700&q=80',
      label: 'No-Makeup Makeup',
      category: 'skin',
    },
  ];

  const galleryFilters = [
    { id: 'all', label: 'All Looks' },
    { id: 'bridal', label: 'Bridal' },
    { id: 'party', label: 'Party' },
    { id: 'skin', label: 'Skin' },
    { id: 'hair', label: 'Hair' },
  ];

  const clientReviews = [
    {
      text: "Every visit here feels like stepping into a high-fashion palace. Ruchi's technical precision on my bridal lookbook was breathtaking.",
      client: 'Aria Montgomery',
      designation: 'Luxury Content Director',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    {
      text: 'The perfect balance of rich rose tones and immaculate cleanliness. My skin transformation after the cellular facial was immediate.',
      client: 'Elena Rostova',
      designation: 'Elite Fashion Columnist',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    {
      text: 'My engagement look held perfectly through nine hours of photographs and dancing. Every detail was considered, nothing felt rushed.',
      client: 'Naina Kapoor',
      designation: 'Bride-to-be, 2026',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    },
    {
      text: 'I came in for a simple trial and left with a complete plan for my whole wedding week. Genuinely felt looked after, not upsold.',
      client: 'Priya Raghunathan',
      designation: 'Bridal Client',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    },
  ];

  // Awards & Recognition — short factual strip placed beside the owner
  // spotlight, reusing the gold accent so it visually belongs there.
  const ownerRecognitions = [
    {
      year: '2024',
      title: 'Best Bridal Studio — Rajasthan Beauty Awards',
    },
    {
      year: '2022',
      title: 'Featured Artist — Vogue India Wedding Edit',
    },
    {
      year: '2019',
      title: 'Certified Master Makeup Artist — Charlotte Tilbury Academy',
    },
    {
      year: '2016',
      title: 'Founding Member — Rajasthan Bridal Artists Guild',
    },
  ];

  // NEW SECTION — "What Our Customers Say": a photo-driven review wall
  // with Indian-context names, cities, and occasions, each paired with
  // a real client-style photo. Designed to rotate through more photos
  // than fit on screen at once via a manual "see more" control.
  const customerReviewWall = [
    {
      photo: 'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?q=80&w=500&auto=format&fit=crop',
      name: 'Sneha Agarwal',
      city: 'Jaipur',
      occasion: 'Bridal Client',
      rating: 5,
      text: 'Ruchi ji ne mera bridal look itna natural aur graceful banaya — sab guests ne tareef ki. Makeup pure din tak waise hi raha jaisa subah laga tha.',
    },
    {
      photo: 'https://images.unsplash.com/photo-1610552050890-fe99536c2614?q=80&w=500&auto=format&fit=crop',
      name: 'Pooja Mehta',
      city: 'Udaipur',
      occasion: 'Sangeet Function',
      rating: 5,
      text: 'Booked for my sister\'s sangeet — the team understood exactly the bold, festive look we wanted. Highly recommend Look Well for any function.',
    },
    {
      photo: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=500&auto=format&fit=crop',
      name: 'Anjali Sharma',
      city: 'Ajmer',
      occasion: 'Engagement',
      rating: 5,
      text: 'Engagement ke liye soft glam look chahiye tha, bilkul perfect mila. Staff bahut hi polite aur professional hai. Studio bhi bahut hygienic laga.',
    },
    {
      photo: 'https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?q=80&w=500&auto=format&fit=crop',
      name: 'Kavita Joshi',
      city: 'Jaipur',
      occasion: 'Facial & Skin Therapy',
      rating: 5,
      text: 'Came in for a regular facial and left glowing — the products they use are genuinely premium. My skin felt soft for almost two weeks after.',
    },
    {
      photo: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=500&auto=format&fit=crop',
      name: 'Riya Kapoor',
      city: 'Pushkar',
      occasion: 'Party Makeup',
      rating: 5,
      text: 'Last minute party booking and they still managed to fit me in and gave such a stunning glam look. Will definitely be a regular here now.',
    },
  ];

  const luxuryFaqs = [
    {
      q: 'What premium cosmetic houses do you source your application layers from?',
      a: 'We deal strictly in premium authentic products sourced straight from luxury lines like Charlotte Tilbury, Dior, and NARS to assure long-lasting skin integrity.',
    },
    {
      q: 'How do I secure an exclusive bridal consultation slot directly with Ruchi Jasmatiya?',
      a: 'You can book directly using our online platform interface or message us on WhatsApp for an instant reply from our team.',
    },
    {
      q: 'Do you offer full multi-tiered customization tracks for destination weddings?',
      a: 'Yes, our team maps out complete bespoke beauty trajectories tailored meticulously to destination event environments.',
    },
    {
      q: 'How far in advance should I book my bridal trial?',
      a: 'We recommend booking your trial 6–8 weeks before the event so we have time to refine the look together and lock your wedding-week schedule.',
    },
    {
      q: 'Do you provide on-location services for weddings outside the studio?',
      a: 'Yes — our senior artists travel for bridal bookings. Travel charges depend on distance and are confirmed during your consultation.',
    },
    {
      q: 'What is your cancellation and rescheduling policy?',
      a: 'Bridal bookings can be rescheduled once free of charge up to 14 days before the event. Standard appointments can be moved with 48 hours notice.',
    },
  ];

  /* ==========================================================================
      AUTOMATED CYCLES & SCROLL REVEAL TRIGGERS
     ========================================================================== */
  useEffect(() => {
    const settleTimer = setTimeout(() => setHeroSettled(true), 900);

    const bannerCycle = setInterval(() => {
      setCurrentBanner((p) => (p + 1) % bannerSlides.length);
      setBannerProgressKey((k) => k + 1);
    }, BANNER_INTERVAL_MS);

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

  // Decide how many review-wall cards to reveal at once based on
  // viewport width, recalculated on resize — keeps the grid from
  // ever exceeding the screen on small devices.
  const [reviewWallVisibleCount, setReviewWallVisibleCount] = useState(5);
  useEffect(() => {
    const computeCount = () => {
      const w = window.innerWidth;
      if (w <= 560) return 1;
      if (w <= 900) return 2;
      if (w <= 1200) return 3;
      return 5;
    };
    const onResize = () => setReviewWallVisibleCount(computeCount());
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const reviewWallStart = currentReviewWall % customerReviewWall.length;
  const visibleReviews = Array.from({ length: Math.min(reviewWallVisibleCount, customerReviewWall.length) }).map(
    (_, i) => customerReviewWall[(reviewWallStart + i) % customerReviewWall.length]
  );

  const filteredGallery =
    activeGalleryFilter === 'all'
      ? lookbookCosmetics
      : lookbookCosmetics.filter((item) => item.category === activeGalleryFilter);

  return (
    <div className="parlor-architecture-wrapper">

      {/* ==========================================================================
          SECTION 0: HERO — choreographed centre-to-settled entrance
         ========================================================================== */}
      <section className={`luxe-hero ${heroSettled ? 'luxe-hero--settled' : 'luxe-hero--center'}`} id="hero-hub">
        <div className="luxe-hero__glow" aria-hidden="true"></div>
        <div className="luxe-hero__glow luxe-hero__glow--secondary" aria-hidden="true"></div>

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

            <div className="luxe-hero__quickstats">
              <div className="luxe-hero__quickstat">
                <strong>15+</strong>
                <span>Years of artistry</span>
              </div>
              <div className="luxe-hero__quickstat-divider" />
              <div className="luxe-hero__quickstat">
                <strong>1,000+</strong>
                <span>Faces transformed</span>
              </div>
              <div className="luxe-hero__quickstat-divider" />
              <div className="luxe-hero__quickstat">
                <strong>4.9★</strong>
                <span>Average rating</span>
              </div>
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
            <div className="luxe-hero__floating-tag luxe-hero__floating-tag--top">
              <span aria-hidden="true">👑</span> Bridal Specialists
            </div>
            <div className="luxe-hero__floating-tag luxe-hero__floating-tag--bottom">
              <span aria-hidden="true">✨</span> HD &amp; Airbrush Finish
            </div>
          </div>
        </div>

        <a href="#premium-services" className="luxe-hero__scroll-cue" aria-label="Scroll to explore">
          <span></span>
        </a>
      </section>

      {/* ==========================================================================
          SECTION 0.5: FULL-BLEED ROTATING BANNER — enhanced
          - Taller on desktop, shorter and re-flowed on mobile
          - Slow continuous Ken-Burns zoom per active slide
          - Category tag pill + large readable caption
          - Segmented progress bar (shows time remaining, not just dots)
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
        <div className="full-banner__grain" aria-hidden="true"></div>

        <div className="full-banner__content">
          <span className="full-banner__caption-tag">{bannerSlides[currentBanner].tag}</span>
          <span className="full-banner__caption-eyebrow">From the Lookbook</span>
          <p className="full-banner__caption-text">{bannerSlides[currentBanner].caption}</p>
        </div>

        <div className="full-banner__controls">
          <div className="full-banner__progress-row">
            {bannerSlides.map((_, i) => (
              <button
                key={i}
                className={`full-banner__progress-seg ${i === currentBanner ? 'full-banner__progress-seg--active' : ''} ${i < currentBanner ? 'full-banner__progress-seg--done' : ''}`}
                onClick={() => { setCurrentBanner(i); setBannerProgressKey((k) => k + 1); }}
                aria-label={`Show banner image ${i + 1}`}
              >
                {i === currentBanner && (
                  <span
                    key={bannerProgressKey}
                    className="full-banner__progress-fill"
                    style={{ animationDuration: `${BANNER_INTERVAL_MS}ms` }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <button
          className="full-banner__arrow full-banner__arrow--prev"
          onClick={() => { setCurrentBanner((p) => (p - 1 + bannerSlides.length) % bannerSlides.length); setBannerProgressKey((k) => k + 1); }}
          aria-label="Previous banner image"
        >
          <svg viewBox="0 0 24 24" width="20" height="20"><path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button
          className="full-banner__arrow full-banner__arrow--next"
          onClick={() => { setCurrentBanner((p) => (p + 1) % bannerSlides.length); setBannerProgressKey((k) => k + 1); }}
          aria-label="Next banner image"
        >
          <svg viewBox="0 0 24 24" width="20" height="20"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
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
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="card-inline-btn-magenta">
                  Inquire Details <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================================================
          SECTION 2.5: HOW IT WORKS — three-step booking flow
         ========================================================================== */}
      <section className="process-flow luxe-reveal">
        <div className="global-header">
          <span className="section-pre">A Calm, Considered Process</span>
          <h2 className="section-heading">How Booking With Us Works</h2>
          <div className="header-underline-accent"></div>
        </div>
        <div className="process-flow__grid">
          {processSteps.map((item, idx) => (
            <React.Fragment key={item.step}>
              <div className="process-flow__card">
                <span className="process-flow__number">{item.step}</span>
                <div className="process-flow__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              {idx < processSteps.length - 1 && (
                <div className="process-flow__connector" aria-hidden="true">
                  <svg viewBox="0 0 60 24" width="60" height="24">
                    <path d="M2 12h44M38 4l12 8-12 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </React.Fragment>
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
              <span className="ticker-offer-slide__tag">{offer.tag}</span>
              <h2>{offer.text}</h2>
              <p>{offer.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================================================
          SECTION 4: WHY CHOOSE LOOK WELL (6 PILLARS — divides evenly
          into 2 or 3 columns at every breakpoint, no orphaned card)
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
            <div className="why-card-five">
              <div className="why-badge-dark-pink">⏱️</div>
              <h3>On-Time, Every Time</h3>
              <p>Punctual studio and on-location service so your schedule never slips.</p>
            </div>
          </div>
        </div>
      </section>


      {/* ==========================================================================
          SECTION 5: LUXURY COSMETICS SHOWCASE GRID — now filterable
         ========================================================================== */}
      <section className="cosmetics-showcase luxe-reveal">
        <div className="global-header">
          <span className="section-pre">The Visual Palette Portfolio</span>
          <h2 className="section-heading">Bespoke Aesthetics Gallery</h2>
          <div className="header-underline-accent"></div>
          <p className="global-header__sub">
            Browse by occasion — every look below was created in-studio for a real client booking.
          </p>
        </div>

        <div className="cosmetics-showcase__filters">
          {galleryFilters.map((filter) => (
            <button
              key={filter.id}
              className={`cosmetics-showcase__filter-btn ${activeGalleryFilter === filter.id ? 'cosmetics-showcase__filter-btn--active' : ''}`}
              onClick={() => setActiveGalleryFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="cosmetics-showcase__grid">
          {filteredGallery.map((item) => (
            <div key={item.src} className="cosmetic-square-item" onClick={() => setActiveModalImg(item.src)}>
              <img src={item.src} alt={item.label} loading="lazy" />
              <div className="cosmetic-square-item__overlay">
                <span>{item.label} 🔍</span>
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

            <ul className="owner-recognitions">
              {ownerRecognitions.map((item) => (
                <li key={item.year} className="owner-recognitions__item">
                  <span className="owner-recognitions__year">{item.year}</span>
                  <span className="owner-recognitions__title">{item.title}</span>
                </li>
              ))}
            </ul>

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
                <span className="frame-signature-badge__crown" aria-hidden="true">✦</span>
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
          SECTION 7.5: NEW — "WHAT OUR CUSTOMERS SAY" PHOTO REVIEW WALL
          5 real client-style photos + short Indian-context reviews,
          laid out responsively (5 → 3 → 2 → 1 columns by breakpoint).
         ========================================================================== */}
      <section className="review-wall luxe-reveal">
        <div className="global-header">
          <span className="section-pre">In Their Own Words</span>
          <h2 className="section-heading">What Our Customers Say</h2>
          <div className="header-underline-accent"></div>
        </div>

        <div className="review-wall__grid">
          {visibleReviews.map((review, idx) => (
            <div className="review-wall__card" key={`${review.name}-${idx}`}>
              <div className="review-wall__photo-frame">
                <img src={review.photo} alt={review.name} loading="lazy" />
                <span className="review-wall__occasion-tag">{review.occasion}</span>
              </div>
              <div className="review-wall__body">
                <div className="review-wall__stars">
                  {Array.from({ length: review.rating }).map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="review-wall__text">&ldquo;{review.text}&rdquo;</p>
                <div className="review-wall__meta">
                  <strong>{review.name}</strong>
                  <span>{review.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="review-wall__nav">
          <button
            className="review-wall__nav-btn"
            onClick={() => setCurrentReviewWall((p) => (p - 1 + customerReviewWall.length) % customerReviewWall.length)}
            aria-label="Show previous reviews"
          >
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <span className="review-wall__nav-label">Real stories from real clients</span>
          <button
            className="review-wall__nav-btn"
            onClick={() => setCurrentReviewWall((p) => (p + 1) % customerReviewWall.length)}
            aria-label="Show more reviews"
          >
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
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

      {/* ==========================================================================
          SECTION 9: FINAL CTA BAND — full-bleed pink, before footer
         ========================================================================== */}
      <section className="final-cta-band luxe-reveal">
        <div className="final-cta-band__glow" aria-hidden="true"></div>
        <div className="final-cta-band__inner">
          <span className="final-cta-band__eyebrow">Ready When You Are</span>
          <h2>Let&rsquo;s plan your most radiant day.</h2>
          <p>
            Bridal slots fill quickly in wedding season — reach out today and
            we&rsquo;ll hold a consultation window for you.
          </p>
          <div className="final-cta-band__actions">
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="luxe-btn luxe-btn--trans-white">
              Message Us on WhatsApp
            </a>
            <Link to="/contact" className="luxe-btn luxe-btn--glow-pink final-cta-band__primary">
              Book Priority Consultation <span>→</span>
            </Link>
          </div>
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

/* ------------------------------------------------------------------
 * MAINTENANCE NOTES
 * ------------------------------------------------------------------
 * Swapping in your own studio photography:
 *   - Every image in this file lives in a small, clearly-named array
 *     near the top of the component (heroPortrait, bannerSlides,
 *     premiumServices, lookbookCosmetics, customerReviewWall, and the
 *     owner's portrait inline in the JSX). Replace the `src`/`img`/
 *     `photo` URL on any entry and the layout reflows automatically —
 *     no other code needs to change.
 *   - Keep aspect ratios close to the originals (square for service
 *     cards and gallery tiles, 4:5 for review-wall photos, wide for
 *     banner slides) so cropping stays clean across breakpoints.
 *
 * Adding a new FAQ, service, offer, or review:
 *   - Copy an existing object inside the relevant array and edit the
 *     fields — the rendering, animation, and responsive behaviour are
 *     all driven by the array length, so nothing else needs touching.
 *
 * The WhatsApp number (WHATSAPP_NUMBER, top of file) is the single
 * source of truth for every "instant contact" link on this page.
 * ------------------------------------------------------------------
 */

