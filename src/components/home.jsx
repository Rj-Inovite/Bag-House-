import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import video from '../assets/images/1.mp4';
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    // Scroll Reveal Logic
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-section').forEach(section => observer.observe(section));

    // Counter Animation
    let start = 0;
    const end = 75000;
    const timer = setInterval(() => {
      start += 1500;
      if (start >= end) {
        setCustomerCount(end);
        clearInterval(timer);
      } else {
        setCustomerCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const categories = [
    { name: 'Ladies Purse', img: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=400' },
    { name: 'Clg & School Bags', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400' },
    { name: 'Office bags', img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=400' },
    { name: 'Purse', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400' },
    { name: 'Tote Bags', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400' }
  ];

  return (
    <div className="home-wrapper">

      {/* NEW VIDEO BANNER SECTION AT THE TOP */}
      <section className="top-video-banner">
        <div className="video-container">
          {/* Replace 'video-url.mp4' with your actual video source */}
          <video autoPlay loop muted playsInline className="hero-video">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
        </div>
      </section>

      {/* WELCOME TEXT WITH ANIMATION */}
      <section className="welcome-section">
        <div className="welcome-container">
          <h1 className="welcome-text">Where every journey begins with the right bag From custom designs to large-scale orders  crafted to meet every requirement.</h1>
        </div>
      </section>

      {/* 1. SLIDING PRODUCT CAROUSEL */}
      <section className="product-carousel reveal-section">
        <div className="carousel-track">
          {categories.map((item, idx) => (
            <div key={idx} className="carousel-item" onClick={() => navigate('/shop')}>
              <div className="shape-container">
                <img src={item.img} alt={item.name} />
              </div>
              <h4>{item.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* 2. BANNER SECTION */}
      <section className="main-banner-container reveal-section">
        <div className="banner-image">
          <div className="banner-overlay">
            <h2>Luxury in Every Stitch</h2>
          </div>
        </div>
      </section>

      {/* 3. ABOUT US SECTION */}
      <section className="about-us reveal-section">
        <div className="about-content">
          <h2 className="gold-title">Our Story</h2>
          <p className="about-theory">
            Born from a passion for timeless elegance, <strong>Darshan Bag House</strong> has been the cornerstone of quality since its inception. 
            We don't just sell bags; we curate companions for your daily hustle, your weekend escapes, and your professional milestones. 
            Every piece is a testament to the harmony between traditional Indian craftsmanship and contemporary global trends.
          </p>
          <div className="thin-divider"></div>
        </div>
      </section>

      {/* 4. YEARS OF EXPERIENCE & CUSTOMERS */}
      <section className="stats-highlight reveal-section">
        <div className="stat-card">
          <h3 className="stat-number">25+</h3>
          <p>Years of Legacy</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-number">{customerCount.toLocaleString()}+</h3>
          <p>Happy Customers</p>
        </div>
      </section>

      {/* 5. BEST SELLERS */}
      <section className="best-seller-section reveal-section">
        <h2 className="centered-title">Our Best Sellers</h2>
        <div className="seller-grid">
          {categories.slice(0, 4).map((item, idx) => (
            <div key={idx} className="square-item" onClick={() => navigate('/shop')}>
              <img src={item.img} alt={item.name} />
              <div className="label-overlay">{item.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FOR HIM & FOR HER */}
      <section className="gender-curation reveal-section">
        <div className="gender-box" onClick={() => navigate('/shop')}>
          <div className="label-box">FOR HIM</div>
          <div className="gender-img-wrapper him"></div>
        </div>
        <div className="gender-box" onClick={() => navigate('/shop')}>
          <div className="label-box">FOR HER</div>
          <div className="gender-img-wrapper her"></div>
        </div>
      </section>

      {/* 7. ART OF LEATHER CRAFTING (With Image Added) */}
      <section className="leather-craft reveal-section">
        <div className="craft-container">
          <div className="craft-info">
            <h2>The Art of Leather Crafting</h2>
            <p>Our artisans select only the finest hides, ensuring a texture that matures beautifully over time. Using age-old techniques passed down through generations, we guarantee durability that stands the test of time.</p>
            <button className="gold-outline-btn">Learn More</button>
          </div>
          <div className="craft-visual">
             <img src="https://images.unsplash.com/photo-1524295928542-bf242966b442?q=80&w=800" alt="Crafting" className="craft-img-fixed" />
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS (4 In One Row) */}
      <section className="reviews reveal-section">
        <h2 className="centered-title">Voice of Our Clients</h2>
        <div className="reviews-grid-row">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="review-square-card">
              <p>"The quality of the bag is unmatched. Truly premium leather and stitching."</p>
              <span className="reviewer">- Customer {i}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;