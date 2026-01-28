import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './contact.css';

const Contact = () => {
  const [reviews, setReviews] = useState([
    { id: 1, name: "Anjali M.", stars: 5, text: "The quality of the leather is amazing!" }
  ]);
  const [newReview, setNewReview] = useState({ name: '', stars: 5, text: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setReviews(reviews.map(r => r.id === editingId ? { ...newReview, id: r.id } : r));
      setEditingId(null);
    } else {
      setReviews([{ ...newReview, id: Date.now() }, ...reviews]);
    }
    setNewReview({ name: '', stars: 5, text: '' });
  };

  const handleEdit = (rev) => {
    setNewReview(rev);
    setEditingId(rev.id);
    const formSection = document.querySelector('.review-input-section');
    if(formSection) {
        window.scrollTo({ top: formSection.offsetTop - 100, behavior: 'smooth' });
    }
  };

  const handleDelete = (id) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
    <div className="contact-premium-full-width">
      {/* 1. HERO SECTION - FULL WIDTH */}
      <section className="contact-hero-brown-theme">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="hero-frame"
        >
          <h1 className="typing-header-gold">Contact Us</h1>
          <p className="reveal">Darshan Bag House • Style Meets Support</p>
        </motion.div>
      </section>

      <div className="full-content-container">
        {/* 2. CONTACT INFO TILES - EXPANDED */}
        <div className="info-grid-premium reveal">
          {[
            { title: 'Visit Our Store', detail: 'Gandhi Road, Heritage Block, City Center' },
            { title: 'Reach Out via Call', detail: '+91 94055 15667' },
            { title: 'Send an Email', detail: 'support@darshanbaghouse.com' }
          ].map((info, i) => (
            <div key={i} className="info-box-premium">
              <div className="box-header-brown">{info.title}</div>
              <p>{info.detail}</p>
              <div className="gold-detail-line"></div>
            </div>
          ))}
        </div>

        {/* 3. REVIEW INPUT SECTION - FULL WIDTH ACCENT */}
        <section className="review-input-section reveal">
          <div className="review-form-wrapper">
            <div className="review-form-card">
              <h2 className="brown-title">{editingId ? 'Edit Your Experience' : 'Leave a Review'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="input-row">
                    <input 
                    type="text" placeholder="Full Name" required
                    value={newReview.name} 
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    />
                    <div className="star-rating">
                    {[1,2,3,4,5].map(star => (
                        <span 
                        key={star} 
                        className={star <= newReview.stars ? "star gold" : "star"}
                        onClick={() => setNewReview({...newReview, stars: star})}
                        >★</span>
                    ))}
                    </div>
                </div>
                <textarea 
                  placeholder="How was your journey with Darshan Bag House?" required
                  value={newReview.text}
                  onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                ></textarea>
                <button type="submit" className="action-btn-brown">
                  {editingId ? 'Update Feedback' : 'Submit Review'}
                </button>
              </form>
            </div>
            <div className="form-decoration-box">
                <h3>Quality is our priority.</h3>
                <p>Your feedback drives our craftsmanship.</p>
            </div>
          </div>
        </section>

        {/* 4. REVIEWS DISPLAY - MASONRY GRID */}
        <section className="live-reviews-section reveal">
          <h2 className="brown-title">Voices of Our Community</h2>
          <div className="reviews-masonry">
            <AnimatePresence>
                {reviews.map((rev) => (
                <motion.div 
                    key={rev.id} 
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="review-bubble"
                >
                    <div className="rev-top">
                    <span className="rev-stars">{"★".repeat(rev.stars)}</span>
                    <div className="rev-actions">
                        <button onClick={() => handleEdit(rev)} className="edit-icon">✎</button>
                        <button onClick={() => handleDelete(rev.id)} className="delete-icon">✕</button>
                    </div>
                    </div>
                    <p className="rev-text">"{rev.text}"</p>
                    <h5 className="rev-author">- {rev.name}</h5>
                </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;