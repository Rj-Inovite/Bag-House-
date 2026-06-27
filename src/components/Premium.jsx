import React, { useState, useEffect, useRef, useCallback } from "react";

/**
 * Premium.jsx
 * ------------------------------------------------------------------
 * A premium, editorial-style makeup artist portfolio page.
 *
 * - Deep "dark pink" (wine-rose) palette instead of generic pastel pink.
 * - Each category section shows 4 square images on desktop in one row.
 * - On mobile, sections become swipeable single-image carousels with
 *   autoplay + manual swipe + dot indicators.
 * - Signature motion: a diagonal "lipstick wipe" reveal on scroll-in.
 *
 * Images: Free-to-use Unsplash photography (safe to use commercially,
 * no scraping/copyright risk). Swap any `src` for your own shoots later.
 * ------------------------------------------------------------------
 */

const CATEGORIES = [
  {
    id: "bridal",
    eyebrow: "The Big Day",
    title: "Bridal",
    description:
      "Long-wear, photo-ready looks built to last through tears, dancing, and golden-hour photos.",
    images: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=900&auto=format&fit=crop",
    ],
  },
  {
    id: "engagement",
    eyebrow: "Say Yes",
    title: "Engagement",
    description:
      "Soft, luminous glam for the moment the ring goes on — radiant but never overdone.",
    images: [
      "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521120098171-c1c1e6e2178a?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=900&auto=format&fit=crop",
    ],
  },
  {
    id: "function",
    eyebrow: "Every Occasion",
    title: "Function & Party",
    description:
      "Bold, statement looks for sangeet nights, cocktail parties, and everything in between.",
    images: [
      "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523264939339-c89f9dadde00?q=80&w=900&auto=format&fit=crop",
    ],
  },
  {
    id: "no-makeup",
    eyebrow: "Less Is More",
    title: "No-Makeup Makeup",
    description:
      "Skin-first, barely-there artistry that enhances what's already there — soft focus, full confidence.",
    images: [
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=900&auto=format&fit=crop",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Hook: detect mobile viewport                                       */
/* ------------------------------------------------------------------ */
function useIsMobile(breakpoint = 720) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

/* ------------------------------------------------------------------ */
/* Hook: reveal-on-scroll (signature lipstick-wipe trigger)           */
/* ------------------------------------------------------------------ */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ------------------------------------------------------------------ */
/* Component: swipeable mobile carousel with autoplay                 */
/* ------------------------------------------------------------------ */
function MobileCarousel({ images, alt }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const autoplayRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (i) => {
      const len = images.length;
      setIndex(((i % len) + len) % len);
    },
    [images.length]
  );

  useEffect(() => {
    if (paused) return;
    autoplayRef.current = setInterval(() => {
      goTo(index + 1);
    }, 3200);
    return () => clearInterval(autoplayRef.current);
  }, [index, paused, goTo]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setPaused(true);
  };
  const onTouchMove = (e) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (touchDeltaX.current > 40) goTo(index - 1);
    else if (touchDeltaX.current < -40) goTo(index + 1);
    setTimeout(() => setPaused(false), 1200);
  };

  return (
    <div className="carousel">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.map((src, i) => (
          <div className="carousel-slide" key={i}>
            <img src={src} alt={`${alt} ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? "dot-active" : ""}`}
            aria-label={`Go to image ${i + 1}`}
            onClick={() => {
              goTo(i);
              setPaused(true);
              setTimeout(() => setPaused(false), 1200);
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Component: one category section                                    */
/* ------------------------------------------------------------------ */
function CategorySection({ category, index }) {
  const [ref, inView] = useInView(0.1);
  const isMobile = useIsMobile();
  const reversed = index % 2 === 1;

  return (
    <section
      ref={ref}
      className={`category ${inView ? "category-revealed" : ""} ${
        reversed ? "category-reversed" : ""
      }`}
      id={category.id}
    >
      <div className="wipe-mask">
        <div className="category-inner">
          <div className="category-copy">
            <span className="eyebrow">{category.eyebrow}</span>
            <h2>{category.title}</h2>
            <p>{category.description}</p>
          </div>

          {isMobile ? (
            <MobileCarousel images={category.images} alt={category.title} />
          ) : (
            <div className="grid-4">
              {category.images.map((src, i) => (
                <div className="grid-cell" key={i}>
                  <img
                    src={src}
                    alt={`${category.title} look ${i + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Main export                                                         */
/* ------------------------------------------------------------------ */
export default function Premium() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="premium-root">
      <style>{`
        :root {
          --ink: #1A0E14;
          --wine: #3D1426;
          --rose: #C9184A;
          --rose-deep: #A4123B;
          --blush: #F5E6E8;
          --gold: #D4A574;
          --paper: #FAF7F5;
          --white: #FFFFFF;
          --font-display: "Fraunces", "Playfair Display", Georgia, serif;
          --font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,500&family=Inter:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        .premium-root {
          font-family: var(--font-body);
          background: var(--paper);
          color: var(--ink);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .premium-root img { display: block; width: 100%; height: 100%; object-fit: cover; }

        /* prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .premium-root * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }

        /* ---------------- NAV ---------------- */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 26px 5vw;
          transition: background 0.4s ease, padding 0.4s ease, box-shadow 0.4s ease;
        }
        .nav.scrolled {
          background: rgba(250, 247, 245, 0.88);
          backdrop-filter: blur(10px);
          padding: 14px 5vw;
          box-shadow: 0 1px 0 rgba(26,14,20,0.06);
        }
        .nav-mark {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: var(--ink);
        }
        .nav-mark span { color: var(--rose); }
        .nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
          margin: 0; padding: 0;
        }
        .nav-links a {
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--wine);
          text-decoration: none;
          opacity: 0.75;
          transition: opacity 0.25s ease;
        }
        .nav-links a:hover, .nav-links a:focus-visible { opacity: 1; }
        @media (max-width: 720px) {
          .nav-links { display: none; }
        }

        /* ---------------- HERO ---------------- */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: radial-gradient(ellipse 120% 80% at 50% -10%, var(--wine) 0%, var(--ink) 60%);
          color: var(--blush);
          padding: 0 5vw;
          overflow: hidden;
        }
        .hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 85% 20%, rgba(201,24,74,0.35), transparent 45%),
            radial-gradient(circle at 10% 85%, rgba(212,165,116,0.18), transparent 40%);
          pointer-events: none;
        }
        .hero-inner {
          position: relative;
          z-index: 2;
          max-width: 1180px;
          margin: 0 auto;
          width: 100%;
          padding-top: 110px;
          padding-bottom: 80px;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 28px;
          opacity: 0;
          animation: rise 0.9s ease forwards 0.1s;
        }
        .hero-eyebrow::before {
          content: "";
          width: 28px; height: 1px;
          background: var(--gold);
        }
        .hero h1 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(48px, 9vw, 108px);
          line-height: 0.96;
          letter-spacing: -0.01em;
          margin: 0 0 28px 0;
          opacity: 0;
          animation: rise 1s ease forwards 0.25s;
        }
        .hero h1 em {
          font-style: italic;
          font-weight: 400;
          color: var(--rose);
          background: linear-gradient(100deg, var(--rose) 0%, #ff5f8f 50%, var(--rose) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: rise 1s ease forwards 0.25s, shimmer 6s ease-in-out infinite 1.2s;
        }
        .hero p {
          max-width: 540px;
          font-size: clamp(16px, 1.8vw, 19px);
          line-height: 1.6;
          color: rgba(245,230,232,0.8);
          margin: 0 0 44px 0;
          opacity: 0;
          animation: rise 1s ease forwards 0.4s;
        }
        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 30px;
          background: var(--rose);
          color: var(--white);
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-decoration: none;
          box-shadow: 0 14px 30px -8px rgba(201,24,74,0.55);
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
          opacity: 0;
          animation: rise 1s ease forwards 0.55s;
        }
        .hero-cta:hover, .hero-cta:focus-visible {
          transform: translateY(-2px);
          box-shadow: 0 18px 36px -8px rgba(201,24,74,0.7);
          background: var(--rose-deep);
        }
        .hero-stats {
          display: flex;
          gap: 48px;
          margin-top: 80px;
          opacity: 0;
          animation: rise 1s ease forwards 0.7s;
        }
        .hero-stat .num {
          font-family: var(--font-display);
          font-size: 34px;
          color: var(--blush);
          display: block;
        }
        .hero-stat .label {
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(245,230,232,0.55);
        }
        @media (max-width: 720px) {
          .hero-stats { gap: 32px; flex-wrap: wrap; }
        }

        @keyframes rise {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* ---------------- CATEGORY SECTIONS ---------------- */
        .category {
          position: relative;
          padding: 110px 5vw;
          max-width: 1240px;
          margin: 0 auto;
        }

        /* Signature motion: lipstick-wipe reveal mask */
        .wipe-mask {
          position: relative;
          clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
          transition: clip-path 1.05s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .category-revealed .wipe-mask {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
        .wipe-mask::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, var(--rose) 0%, var(--gold) 100%);
          transform: scaleX(0);
          transform-origin: left;
          z-index: 5;
          pointer-events: none;
        }
        .category-revealed .wipe-mask::before {
          animation: wipeSweep 0.95s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        @keyframes wipeSweep {
          0% { transform: scaleX(0); transform-origin: left; opacity: 1; }
          55% { transform: scaleX(1); transform-origin: left; opacity: 1; }
          100% { transform: scaleX(1); transform-origin: right; opacity: 0; }
        }

        .category-inner {
          display: grid;
          grid-template-columns: 0.85fr 2fr;
          gap: 56px;
          align-items: start;
        }
        .category-reversed .category-inner {
          grid-template-columns: 2fr 0.85fr;
        }
        .category-reversed .category-copy { order: 2; }
        .category-reversed .grid-4, .category-reversed .carousel { order: 1; }

        .category-copy { position: sticky; top: 120px; }
        .eyebrow {
          display: inline-block;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--rose);
          font-weight: 600;
          margin-bottom: 14px;
        }
        .category-copy h2 {
          font-family: var(--font-display);
          font-size: clamp(34px, 4vw, 50px);
          font-weight: 600;
          line-height: 1.04;
          margin: 0 0 18px 0;
          color: var(--wine);
        }
        .category-copy p {
          font-size: 16px;
          line-height: 1.7;
          color: #5b4047;
          max-width: 320px;
          margin: 0;
        }

        .grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        .grid-cell {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 14px;
          background: var(--blush);
          box-shadow: 0 18px 40px -18px rgba(61,20,38,0.35);
        }
        .grid-cell img {
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease;
        }
        .grid-cell:hover img {
          transform: scale(1.08);
        }
        .grid-cell::after {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(200deg, transparent 60%, rgba(26,14,20,0.35) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .grid-cell:hover::after { opacity: 1; }

        @media (max-width: 980px) {
          .category-inner {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .category-reversed .category-inner { grid-template-columns: 1fr; }
          .category-reversed .category-copy { order: 0; }
          .category-reversed .grid-4, .category-reversed .carousel { order: 0; }
          .category-copy { position: static; max-width: 100%; }
          .category-copy p { max-width: 100%; }
        }

        @media (max-width: 720px) {
          .category { padding: 64px 6vw; }
          .grid-4 { grid-template-columns: repeat(2, 1fr); }
        }

        /* ---------------- MOBILE CAROUSEL ---------------- */
        .carousel {
          position: relative;
          width: 100%;
        }
        .carousel-track {
          display: flex;
          width: 100%;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          touch-action: pan-y;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 18px 40px -16px rgba(61,20,38,0.4);
        }
        .carousel-slide {
          flex: 0 0 100%;
          aspect-ratio: 1 / 1;
        }
        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
        }
        .dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          border: none;
          background: rgba(61,20,38,0.2);
          padding: 0;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .dot-active {
          background: var(--rose);
          transform: scale(1.3);
        }

        /* On desktop, .grid-4 is used; on mobile .carousel is used (rendered conditionally in JS) */

        /* ---------------- CTA / FOOTER ---------------- */
        .closing {
          position: relative;
          background: linear-gradient(160deg, var(--wine) 0%, var(--ink) 100%);
          color: var(--blush);
          padding: 130px 5vw;
          text-align: center;
          overflow: hidden;
        }
        .closing::before {
          content: "";
          position: absolute;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(201,24,74,0.3), transparent 70%);
          top: -200px; left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }
        .closing-inner { position: relative; z-index: 2; max-width: 720px; margin: 0 auto; }
        .closing h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(32px, 5vw, 56px);
          margin: 0 0 20px 0;
        }
        .closing p {
          font-size: 17px;
          line-height: 1.7;
          color: rgba(245,230,232,0.75);
          margin: 0 0 36px 0;
        }
        .closing .hero-cta { animation: none; opacity: 1; }

        footer {
          background: var(--ink);
          color: rgba(245,230,232,0.45);
          text-align: center;
          font-size: 13px;
          padding: 28px 5vw;
          letter-spacing: 0.04em;
        }
        footer span { color: var(--rose); }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-mark">
          Méline<span>.</span>
        </div>
        <ul className="nav-links">
          <li><a href="#bridal">Bridal</a></li>
          <li><a href="#engagement">Engagement</a></li>
          <li><a href="#function">Function</a></li>
          <li><a href="#no-makeup">No-Makeup</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="hero-inner">
          <span className="hero-eyebrow">Makeup Artistry &amp; Portfolio</span>
          <h1>
            Beauty, <em>composed</em>
            <br />
            for the moment.
          </h1>
          <p>
            From bridal mornings to engagement evenings — every look is
            tailored to the face, the light, and the occasion. Browse the
            portfolio below.
          </p>
          <a className="hero-cta" href="#bridal">
            View the portfolio →
          </a>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="num">4</span>
              <span className="label">Signature styles</span>
            </div>
            <div className="hero-stat">
              <span className="num">100+</span>
              <span className="label">Looks created</span>
            </div>
            <div className="hero-stat">
              <span className="num">5★</span>
              <span className="label">Client rated</span>
            </div>
          </div>
        </div>
      </header>

      {/* CATEGORY SECTIONS */}
      {CATEGORIES.map((cat, i) => (
        <CategorySection category={cat} index={i} key={cat.id} />
      ))}

      {/* CLOSING CTA */}
      <section className="closing">
        <div className="closing-inner">
          <h2>Let's create your look.</h2>
          <p>
            Available for bridal bookings, engagements, and events.
            Get in touch to check dates and discuss your vision.
          </p>
          <a className="hero-cta" href="#">
            Book a consultation →
          </a>
        </div>
      </section>

      <footer>
        © {new Date().getFullYear()} Méline Makeup Artistry — crafted with <span>♥</span>
      </footer>
    </div>
  );
}