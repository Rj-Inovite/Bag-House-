import React, { useState, useEffect, useRef, useCallback } from "react";

const CATEGORIES = [
  {
    id: "bridal",
    eyebrow: "01 — The Big Day",
    title: "Bridal",
    description:
      "Long-wear, photo-ready artistry built to hold through vows, tears, dancing, and golden-hour photos.",
    images: [
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp7UVI3FtYEbth4WwdS21fLeNnye5kGK0vAUacmI8OHw&s=10", alt: "Bride with traditional gold jewellery and bridal makeup" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG8lJhzIRjE6hVIkt6kTOyaAW11tAg2KqracaL2ACrRA&s=10", alt: "Bridal makeup close-up with defined eyes and soft lips" },
      { src: "https://rthreesalon.in/wp-content/uploads/2025/08/1745318945Bridal-Makeup-1024x1024.jpeg", alt: "Bride in red and gold, portrait close-up" },
      { src: "https://www.weddingplz.com/blog/wp-content/uploads/1-44-819x1024.jpg", alt: "Bridal portrait with deep red lip and dewy skin" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5z4SSXz0EynyuRRMCieG_tLCD9tNg_KvptqZgBZVyvw&s=10", alt: "Bride in ornate jewellery, festive bridal makeup" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvPP5ewavbo9plzEUKMHDIZ92a4gd4E6Ro0dWnWzLXrA&s=10", alt: "Bridal portrait with floral jewellery and soft glam" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnUbG7fGFgiIxVeS_jFAg4AHqYE7uz4e-DRoOVLIZFsQ&s=10", alt: "Traditional bridal makeup with gold accents" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoESAoj3CIuY7ktxCiMoZcM0Deb3AYuV_i44zZy9JHHQ&s=10", alt: "Bride portrait with rich bridal makeup and veil" },
    ],
  },
  {
    id: "engagement",
    eyebrow: "02 — Say Yes",
    title: "Engagement",
    description:
      "Soft, luminous glam for the moment the ring goes on — radiant but never overdone.",
    images: [
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPKtzaCx44Wc2k_9xhzwjylNXn26XY68WXvbbAbk5Z1w&s=10", alt: "Soft glam engagement makeup look" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS85XnySkYWaW3HhbKKFcjIFrC8i8fjv3yhH6WaRe5nWA&s=10", alt: "Romantic makeup with soft pink tones" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvp4JCvpggnnPFNa3SDHEh7uG6Rdkw0cEneAnFUQ6VUg&s", alt: "Natural glowing engagement makeup close-up" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPKoMtlOVeGS3kzw12WLf5pcakDJXqs7Jam1b8goR5kA&s=10", alt: "Glam portrait with soft highlight and warm tones" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtevvHdXTTNJkAKSUHJK8EqWYFIWe6DOpCKE4zFXETuQ&s=10", alt: "Soft romantic glam makeup portrait" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSCtknGuqeQrDpv5bhJWU9e1sOlDMjoY-Zgvqw1d2LYA&s=10", alt: "Dewy radiant engagement makeup look" },
      { src: "https://image.wedmegood.com/resized-nw/700X/wp-content/uploads/2014/06/IMG-6092.jpg.jpg", alt: "Soft daylight glam portrait" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgmkdASp2zxdxCYReWqhNMSjO6tT4B93OVYdu5GfWtmw&s=10", alt: "Glowing engagement makeup with warm blush" },
    ],
  },
  {
    id: "party",
    eyebrow: "03 — Every Occasion",
    title: "Party & Function",
    description:
      "Bold, statement looks for sangeet nights, cocktail evenings, and every celebration in between.",
    images: [
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2LLHYgWDeB_55P598ChLeZRttD5Xnn_10PW9iMuOa6A&s=10", alt: "Bold party makeup with defined smoky eyes" },
      { src: "https://bloomandbeauty.orderz.in/uploads/stores/3643/d5326b87-e097-435c-bb74-1884c420ac68_original.jpg", alt: "Glamorous evening makeup look with bold lip" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm1fbat-lmduKn0FJx4AS60O0duXpJt1lIy29yrlfU9A&s=10", alt: "Statement party makeup with shimmer eyeshadow" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfiEbevKqZxTjSFI5lYj0LNVVhclwl5g2YRwXZyzKdEA&s=10", alt: "Vibrant festive makeup look close-up" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk3FbWKYHkVaD9crmhC5nwoMGTn46lC6J3m-7iu4lJgLAc42oo5G5_wL4W&s=10", alt: "Glamorous night-out makeup portrait" },
      { src: "https://cdn.shopify.com/s/files/1/0651/8666/0595/files/ChatGPT_Image_Nov_18_2025_04_52_05_PM.png?v=1763643950", alt: "Festive party makeup with bold eye look" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYbKhapmLVqD1BgWssm3co38YgcaN1UdDLu5gW5J090w&s=10", alt: "Evening glam makeup with shimmer" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU2VqpWLcSCArDx7G5VPuRhb2CZDDzUzGg5sICVGzoSQ&s=10", alt: "Bold festive makeup look" },
    ],
  },
  {
    id: "no-makeup",
    eyebrow: "04 — Less Is More",
    title: "Glam Makeup",
    description:
      "Skin-first, barely-there artistry that enhances what's already there — soft focus, full confidence.",
    images: [
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw8lxyLxjr9nLPcFpyUkNvzXyAG-Erq_7PgIUc71bd_w&s=10", alt: "Natural no-makeup makeup look with dewy skin" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHwerVENchsLQ4asbvpmrTxp5y5LeudY-8TGIMs6IBRQ&s=10", alt: "Soft natural makeup portrait, minimal and fresh" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2odfI_m6uePHDFCsQayU4J_POGgpC9m6ly8oqjbLaZA&s=10", alt: "Clean skin-first makeup look, soft daylight" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGSMZHYEBaIzyLq1EjjQjRfYdzzWpTC03gy8WFq2mI8A&s=10", alt: "Effortless natural beauty portrait" },
      { src: "https://www.paccosmetics.com/cdn/shop/articles/Blog_Img13_df4c0b4f-9f9e-4334-bc8e-916664f7eb5b.jpg?v=1760790991&width=2048", alt: "Minimal soft glow makeup look" },
        ],
  },
];

const HERO_COLLAGE = [
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgHODYFnKa0iUYQTOe4pr9raTT7C3-D6oWgyF9HoBnoA&s=10",
    alt: "Bridal makeup portrait",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzMj4NDI6iOgr-IeCAHaSbGcem75CPb0CFR2UAjEEMg&s=10",
    alt: "Soft romantic makeup portrait",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSCtknGuqeQrDpv5bhJWU9e1sOlDMjoY-Zgvqw1d2LYA&s=10",
    alt: "Natural glowing makeup portrait",
  },
];

/* "Book a consultation" opens WhatsApp chat with this number, message      */
/* pre-filled, so the conversation starts instantly with no extra typing.   */
const WHATSAPP_NUMBER = "917720929132";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi! I'd love to book a makeup consultation."
)}`;

/* ------------------------------------------------------------------ */
/* Hook: reveal-on-scroll                                             */
/* ------------------------------------------------------------------ */
function useInView(threshold = 0.12) {
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
/* Component: the gallery track — one shared implementation for both  */
/* desktop and mobile. Native horizontal scroll-snap does the heavy   */
/* lifting: trackpad/wheel scroll and touch swipe both "just work".   */
/* On top of that we add: mouse-drag-to-scroll (desktop), prev/next   */
/* arrow buttons, and a progress bar synced to scroll position.       */
/* Desktop shows exactly 4 cards per "page"; mobile shows exactly 1.  */
/* ------------------------------------------------------------------ */
function GalleryTrack({ images }) {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0..1
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setProgress(max <= 0 ? 0 : track.scrollLeft / max);
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateEdges();
    track.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      track.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const stepBy = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".gallery-card");
    const cardWidth = card ? card.getBoundingClientRect().width + 18 : track.clientWidth;
    const perPage = window.innerWidth <= 760 ? 1 : 4;
    track.scrollBy({ left: dir * cardWidth * perPage, behavior: "smooth" });
  };

  /* mouse-drag-to-scroll on desktop */
  const onPointerDown = (e) => {
    if (e.pointerType === "touch") return; // let native touch scrolling handle mobile
    const track = trackRef.current;
    drag.current = { active: true, startX: e.clientX, startScroll: track.scrollLeft, moved: false };
    track.classList.add("is-dragging");
  };
  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const track = trackRef.current;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    track.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = () => {
    const track = trackRef.current;
    if (track) track.classList.remove("is-dragging");
    drag.current.active = false;
  };
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="gallery">
      <div
        className="gallery-track"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
      >
        {images.map((img, i) => (
          <figure className="gallery-card" key={i}>
            <img src={img.src} alt={img.alt} loading="lazy" draggable={false} />
          </figure>
        ))}
      </div>

      <button
        className={`gallery-arrow gallery-arrow-prev ${atStart ? "is-disabled" : ""}`}
        aria-label="Show previous images"
        onClick={() => stepBy(-1)}
        disabled={atStart}
      >
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
          <path d="M17 7H1M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        className={`gallery-arrow gallery-arrow-next ${atEnd ? "is-disabled" : ""}`}
        aria-label="Show more images"
        onClick={() => stepBy(1)}
        disabled={atEnd}
      >
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
          <path d="M1 7h16M11 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="gallery-progress" aria-hidden="true">
        <div className="gallery-progress-fill" style={{ transform: `scaleX(${Math.max(progress, 0.06)})` }} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Component: one category section                                    */
/* ------------------------------------------------------------------ */
function CategorySection({ category }) {
  const [ref, inView] = useInView(0.06);

  return (
    <section
      ref={ref}
      className={`category ${inView ? "category-revealed" : ""}`}
      id={category.id}
    >
      <div className="category-head">
        <div>
          <span className="eyebrow">{category.eyebrow}</span>
          <h2>{category.title}</h2>
        </div>
        <p>{category.description}</p>
      </div>

      <GalleryTrack images={category.images} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Main export                                                         */
/* ------------------------------------------------------------------ */
export default function Premium() {
  return (
    <div className="premium-root">
      <style>{`
        :root {
          --rose-50:  #FFF6F8;
          --rose-100: #FCE4EC;
          --rose-200: #F8C9D9;
          --rose-300: #F3A6C2;
          --rose-500: #E0457B;
          --rose-600: #C8366A;
          --rose-700: #B22F5C;
          --ink:      #2B1620;
          --ink-soft: #6B4956;
          --gold:     #C9A24B;
          --white:    #FFFFFF;
          --font-display: "Fraunces", "Playfair Display", Georgia, serif;
          --font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500;1,9..144,600&family=Inter:wght@300;400;500;600;700&display=swap');

        .premium-root, .premium-root * { box-sizing: border-box; }

        .premium-root {
          font-family: var(--font-body);
          background: var(--rose-50);
          color: var(--ink);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .premium-root img { display: block; width: 100%; height: 100%; object-fit: cover; }
        .premium-root a { -webkit-tap-highlight-color: transparent; }

        .premium-root *:focus-visible {
          outline: 2px solid var(--rose-600);
          outline-offset: 3px;
          border-radius: 4px;
        }

        @media (prefers-reduced-motion: reduce) {
          .premium-root * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }

        /* ---------------- HERO ---------------- */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: var(--white);
          padding: 0 5vw;
          overflow: hidden;
        }
        .hero::before {
          content: "";
          position: absolute;
          width: 70vw; height: 70vw;
          max-width: 900px; max-height: 900px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--rose-100) 0%, rgba(252,228,236,0) 70%);
          top: -20%; right: -18%;
          pointer-events: none;
        }
        .hero-inner {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
          padding-top: 64px;
          padding-bottom: 70px;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: center;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--rose-600);
          margin-bottom: 26px;
          opacity: 0;
          animation: rise 0.9s ease forwards 0.1s;
        }
        .hero-eyebrow::before {
          content: "";
          width: 26px; height: 1px;
          background: var(--rose-500);
        }
        .hero h1 {
          font-family: var(--font-display);
          font-optical-sizing: auto;
          font-weight: 600;
          font-size: clamp(46px, 6.8vw, 92px);
          line-height: 0.98;
          letter-spacing: -0.022em;
          margin: 0 0 26px 0;
          color: var(--ink);
          opacity: 0;
          animation: rise 1s ease forwards 0.22s;
        }
        .hero h1 em {
          font-style: italic;
          font-weight: 500;
          color: var(--rose-600);
        }
        .hero p {
          max-width: 460px;
          font-size: clamp(16px, 1.6vw, 18px);
          line-height: 1.65;
          color: var(--ink-soft);
          margin: 0 0 38px 0;
          opacity: 0;
          animation: rise 1s ease forwards 0.36s;
        }
        .hero-ctas {
          display: flex;
          align-items: center;
          gap: 22px;
          opacity: 0;
          animation: rise 1s ease forwards 0.5s;
        }
        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 30px;
          background: var(--rose-500);
          color: var(--white);
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-decoration: none;
          box-shadow: 0 16px 30px -10px rgba(224,69,123,0.55);
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }
        .hero-cta:hover, .hero-cta:focus-visible {
          transform: translateY(-2px);
          box-shadow: 0 20px 36px -10px rgba(224,69,123,0.65);
          background: var(--rose-700);
        }
        .hero-cta-ghost {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
          text-decoration: none;
          border-bottom: 1.5px solid var(--rose-300);
          padding-bottom: 3px;
          transition: border-color 0.25s ease, color 0.25s ease;
        }
        .hero-cta-ghost:hover { border-color: var(--rose-600); color: var(--rose-600); }

        .hero-stats {
          display: flex;
          gap: 44px;
          margin-top: 64px;
          opacity: 0;
          animation: rise 1s ease forwards 0.64s;
        }
        .hero-stat .num {
          font-family: var(--font-display);
          font-size: 30px;
          color: var(--ink);
          display: block;
        }
        .hero-stat .label {
          font-size: 11.5px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--ink-soft);
        }

        /* hero photo collage — images sit still, no floating motion */
        .hero-collage {
          position: relative;
          height: 560px;
          opacity: 0;
          animation: rise 1.1s ease forwards 0.3s;
        }
        .collage-img {
          position: absolute;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 30px 60px -20px rgba(43,22,32,0.28);
          border: 6px solid var(--white);
        }
        .collage-img:nth-child(1) {
          width: 62%; height: 72%;
          top: 0; right: 0;
          z-index: 2;
        }
        .collage-img:nth-child(2) {
          width: 48%; height: 46%;
          bottom: 0; left: 0;
          z-index: 3;
        }
        .collage-img:nth-child(3) {
          width: 34%; height: 34%;
          top: 8%; left: -6%;
          z-index: 1;
        }
        .collage-badge {
          position: absolute;
          bottom: 8%; right: 4%;
          z-index: 4;
          background: var(--white);
          border-radius: 999px;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 18px 36px -14px rgba(43,22,32,0.3);
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
        }
        .collage-badge .stars { color: var(--gold); letter-spacing: 1px; }

        @media (max-width: 980px) {
          .hero-inner { grid-template-columns: 1fr; padding-top: 56px; }
          .hero-collage { height: 440px; margin-top: 28px; order: -1; }
          .hero p { max-width: 100%; }
        }
        @media (max-width: 540px) {
          .hero { padding: 0 6vw; }
          .hero-collage { height: 340px; margin-top: 22px; }
          .collage-img { border-width: 4px; border-radius: 18px; }
          .collage-img:nth-child(3) { left: -3%; }
          .collage-badge {
            position: static;
            margin: 16px auto 0;
            width: max-content;
            padding: 9px 16px;
            font-size: 12px;
            gap: 7px;
          }
          .hero-stats { gap: 26px; flex-wrap: wrap; margin-top: 40px; }
          .hero-ctas { flex-wrap: wrap; gap: 16px; }
        }

        @keyframes rise {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ---------------- MARQUEE STRIP ---------------- */
        .marquee {
          background: var(--ink);
          overflow: hidden;
          padding: 16px 0;
          position: relative;
        }
        .marquee-track {
          display: flex;
          gap: 56px;
          white-space: nowrap;
          animation: marquee 28s linear infinite;
          width: max-content;
        }
        .marquee-track span {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 17px;
          color: rgba(255,246,248,0.65);
          display: inline-flex;
          align-items: center;
          gap: 56px;
        }
        .marquee-track span::after {
          content: "✦";
          font-style: normal;
          color: var(--rose-300);
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* ---------------- CATEGORY SECTIONS — image-first ---------------- */
        .category {
          position: relative;
          padding: 80px 5vw 64px;
          max-width: 1480px;
          margin: 0 auto;
        }
        .category + .category {
          border-top: 1px solid var(--rose-100);
        }

        .category-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 28px;
          flex-wrap: wrap;
          margin-bottom: 36px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .category-revealed .category-head { opacity: 1; transform: translateY(0); }

        .eyebrow {
          display: inline-block;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--rose-600);
          font-weight: 700;
          margin-bottom: 12px;
        }
        .category-head h2 {
          position: relative;
          display: inline-block;
          font-family: var(--font-display);
          font-optical-sizing: auto;
          font-size: clamp(38px, 5vw, 62px);
          font-weight: 600;
          letter-spacing: -0.015em;
          line-height: 1.0;
          margin: 0;
          color: var(--ink);
        }
        .category-head p {
          font-size: 16px;
          line-height: 1.6;
          color: var(--ink-soft);
          max-width: 380px;
          margin: 0;
          text-align: right;
        }

        /* ---- Gallery: shows exactly 4 cards/screen on desktop, 1 on mobile ---- */
        .gallery {
          position: relative;
        }
        .gallery-track {
          display: flex;
          gap: 18px;
          width: 100%;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          cursor: grab;
          padding-bottom: 4px;
          user-select: none;
        }
        .gallery-track::-webkit-scrollbar { display: none; }
        .gallery-track.is-dragging { cursor: grabbing; scroll-snap-type: none; }

        .gallery-card {
          flex: 0 0 calc(25% - 13.5px);
          scroll-snap-align: start;
          aspect-ratio: 3 / 4;
          margin: 0;
          border-radius: 18px;
          overflow: hidden;
          background: var(--rose-100);
          box-shadow: 0 20px 44px -22px rgba(43,22,32,0.4);
          opacity: 0;
          transform: translateY(26px) scale(0.97);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .category-revealed .gallery-card {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .gallery-card img {
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }
        .gallery-track:not(.is-dragging) .gallery-card:hover img { transform: scale(1.06); }

        .gallery-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 52px; height: 52px;
          border-radius: 50%;
          border: none;
          background: var(--white);
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 14px 30px -10px rgba(43,22,32,0.35);
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease, opacity 0.25s ease;
          z-index: 3;
        }
        .gallery-arrow:hover { background: var(--rose-500); color: var(--white); }
        .gallery-arrow.is-disabled { opacity: 0; pointer-events: none; }
        .gallery-arrow-prev { left: -22px; }
        .gallery-arrow-next { right: -22px; }

        .gallery-progress {
          height: 3px;
          background: var(--rose-100);
          border-radius: 3px;
          margin-top: 22px;
          overflow: hidden;
        }
        .gallery-progress-fill {
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, var(--rose-300), var(--rose-600));
          transform-origin: left;
          transform: scaleX(0.1);
          transition: transform 0.2s ease-out;
          border-radius: 3px;
        }

        @media (max-width: 1200px) {
          .gallery-card { flex: 0 0 calc(33.333% - 12px); }
        }
        @media (max-width: 980px) {
          .category-head { flex-direction: column; align-items: flex-start; gap: 10px; }
          .category-head p { text-align: left; max-width: 100%; }
          .gallery-card { flex: 0 0 calc(50% - 9px); }
          .gallery-arrow { display: none; }
        }
        @media (max-width: 760px) {
          .category { padding: 56px 6vw 48px; }
          .gallery-card { flex: 0 0 88%; aspect-ratio: 4 / 5; }
          .gallery-progress { margin-top: 18px; }
        }

        /* ---------------- CLOSING CTA ---------------- */
        .closing {
          position: relative;
          background: var(--ink);
          color: var(--rose-50);
          padding: 130px 5vw;
          text-align: center;
          overflow: hidden;
        }
        .closing::before {
          content: "";
          position: absolute;
          width: 560px; height: 560px;
          background: radial-gradient(circle, rgba(224,69,123,0.28), transparent 70%);
          top: -220px; left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }
        .closing-inner { position: relative; z-index: 2; max-width: 680px; margin: 0 auto; }
        .closing span.eyebrow { color: var(--rose-300); }
        .closing h2 {
          font-family: var(--font-display);
          font-optical-sizing: auto;
          font-weight: 600;
          font-size: clamp(34px, 5.6vw, 60px);
          letter-spacing: -0.015em;
          line-height: 1.05;
          margin: 18px 0 18px 0;
        }
        .closing h2 em { font-style: italic; font-weight: 500; color: var(--rose-300); }
        .closing p {
          font-size: 16.5px;
          line-height: 1.7;
          color: rgba(255,246,248,0.7);
          margin: 0 0 38px 0;
        }
      `}</style>


      {/* HERO */}
      <header className="hero">
        <div className="hero-inner">
          <div>
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
            <div className="hero-ctas">
              <a className="hero-cta" href="#bridal">View the portfolio →</a>
              <a className="hero-cta-ghost" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">Book a consultation</a>
            </div>

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

          <div className="hero-collage">
            <div className="collage-img collage-img-1">
              <img src={HERO_COLLAGE[0].src} alt={HERO_COLLAGE[0].alt} />
            </div>
            <div className="collage-img collage-img-2">
              <img src={HERO_COLLAGE[1].src} alt={HERO_COLLAGE[1].alt} />
            </div>
            <div className="collage-img collage-img-3">
              <img src={HERO_COLLAGE[2].src} alt={HERO_COLLAGE[2].alt} />
            </div>
            <div className="collage-badge">
              <span className="stars">★★★★★</span>
              <span>Loved by 100+ brides</span>
            </div>
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, dup) => (
            <span key={dup}>
              Bridal <span>Engagement</span> Party &amp; Function <span>No-Makeup Makeup</span> Bridal <span>Engagement</span> Party &amp; Function <span>No-Makeup Makeup</span>
            </span>
          ))}
        </div>
      </div>

      {/* CATEGORY SECTIONS — fully devoted to images */}
      {CATEGORIES.map((cat) => (
        <CategorySection category={cat} key={cat.id} />
      ))}

      {/* CLOSING CTA */}
      <section className="closing" id="contact">
        <div className="closing-inner">
          <span className="eyebrow">Get in touch</span>
          <h2>Let's create <em>your</em> look.</h2>
          <p>
            Available for bridal bookings, engagements, and events.
            Get in touch to check dates and discuss your vision.
          </p>
          <a className="hero-cta" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            Book a consultation →
          </a>
        </div>
      </section>
    </div>
  );
}