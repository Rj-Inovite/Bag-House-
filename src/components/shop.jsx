import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './shop.css';

const Shop = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Updated Product Data with your specific image links
  const products = [
    // SCHOOL & CLG BAGS
    { id: 9, category: 'School  &  Clg Bags', name: 'Gray Scholar Pack', img: 'https://toyshine.in/cdn/shop/files/SB-678-10_GRAY_6_480x480@2x.jpg?v=1687423073' },
    { id: 10, category: 'School  &  Clg Bags', name: 'Coaching Special', img: 'https://rukminim2.flixcart.com/image/480/640/xif0q/bag/p/o/v/45-school-bags-for-boys-and-girls-coaching-bag-tuition-bag-original-imagtj5huz5pqg3v.jpeg?q=90' },
     { id: 12, category: 'School  &  Clg Bags', name: 'Stylish Handbag Pack', img: 'https://rukminim2.flixcart.com/image/480/640/kqe3low0/backpack/z/n/o/small-10l-backpack-stylish-backpack-cum-handbag-cum-shoulder-bag-original-imag4eueh9nw7vjx.jpeg?q=90' },
    { id: 13, category: 'School  &  Clg Bags', name: 'Classic Student Bag', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE2JVi0sGung2qDUcF_eT_1iWKOOBtuy099g&s' },
    { id: 14, category: 'School  &  Clg Bags', name: 'Junior Scholar', img: 'https://palay.in/cdn/shop/files/619b4lSPuRL.jpg?v=1765434215' },

    // TRAVELLING & TREAKING BAGS
    { id: 17, category: 'Travelling & Treaking  Bags', name: 'Adventure Rucksack', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW1djFwsLHvkMMrIcH8a0OroTj4D_PLa_Pkg&s' },
    { id: 18, category: 'Travelling & Treaking  Bags', name: 'Professional Trekker', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI-QhoI1aKvxx4lsPYvxSRL904JI7nFRWUyA&s' },
    { id: 19, category: 'Travelling & Treaking  Bags', name: 'Luggage World Trek', img: 'https://m.media-amazon.com/images/I/71HN29hKMbL._AC_UY1100_.jpg'},



    // LADIES PURSE
    { id: 1, category: 'Ladies Purse', name: 'Elite Leather Tote', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv4msJS0Z_r8rlUaPUqvOYwGautkMSM1e98A&s' },
    { id: 3, category: 'Ladies Purse', name: 'Exotic Handbag', img: 'https://rukminim2.flixcart.com/image/480/580/xif0q/hand-messenger-bag/r/s/m/new-hand-bag-for-women-11-5-hb-88-handbag-exotic-8-original-imah67yrpwjhphrs.jpeg?q=90' },
    { id: 4, category: 'Ladies Purse', name: 'Premium Sling Bag', img: 'https://img.kwcdn.com/product/fancy/f08055b1-6652-4d75-9efa-14547b6d5376.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp' },
    { id: 5, category: 'Ladies Purse', name: 'Urban Satchel', img: 'https://www.designeritalianbags.com/wp-content/uploads/2023/11/product-_marino_orlandi_tote_purse_handpainted_red_peonies_alabaster_leather_bag_italian_designer_handbag-02mo4649hlwht_newmain_1600.jpg' },
    { id: 6, category: 'Ladies Purse', name: 'Toka Satcom', img: 'https://sc04.alicdn.com/kf/H24eb0ceab09543c8868739e1625e453fN.jpg' },
    { id: 7, category: 'Ladies Purse', name: 'Urban moronl', img: 'https://storeassets.im-cdn.com/temp/cuploads/ap-south-1:3a847a72-16ba-4dc5-a608-a92af85a1da2/bhavilois/products/1649085304453H8805e3eb99db444fbfee9e12663f1035a.jpg' },



    // TROLLY BAG
    { id: 33, category: 'Trolly Bag', name: 'Pink Model Spinner', img: 'https://assets.ajio.com/medias/sys_master/root/20240530/O06k/6658b21b05ac7d77bb91790c/-473Wx593H-465726854-pink-MODEL.jpg' },
    { id: 34, category: 'Trolly Bag', name: 'Hard Shell Carry-on', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDyk5H0orMlgu0Tb1QKo2y_SxKm4JSHKPFIA&s' },
    { id: 35, category: 'Trolly Bag', name: 'Premium Voyager', img: 'https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/OCTOBER/7/n8Jgx4Xs_7df85f67cf23462f98e09ade7f2b3ece.jpg' },
    { id: 36, category: 'Trolly Bag', name: 'Premium Voyager', img: 'https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/MAY/17/FvQ6srva_eaac9b8eae8741688c0549d7b5f355de.jpg' },
   { id: 37, category: 'Trolly Bag', name: 'Premium Voyager', img: 'https://m.media-amazon.com/images/I/31FyTuYxsFL._AC_SR290,290_.jpg' },
   


    // DUFFLES & AIR BAG
    { id: 40, category: 'Duffles & Air Bag', name: 'Sporty Duffle', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSpapE-QMWCdMyRwvOey5ehk1xoK7QkpjNCQ&s' },
    { id: 41, category: 'Duffles & Air Bag', name: 'Nykaa Special Air Bag', img: 'https://images-static.nykaa.com/media/catalog/product/4/a/4afae2aDNYKNFI0000059_9.jpg?tr=w-500' },
    { id: 42, category: 'Duffles & Air Bag', name: 'Travel Air Bag', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTNIAQSgOP6Iqn1FeJlCwABDc7NOZg7vu00A&s' }
  ];

  const categories = [
    'All', 'School  &  Clg Bags', 'Travelling & Treaking  Bags', 'Ladies Purse', 
    'Trolly Bag', 'Duffles & Air Bag'
  ];

  // Logic to filter products
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(item => item.category === filter);

  return (
    <div className="shop-page full-width">
      <div className="store-invite-bar">
        <motion.div 
          className="scrolling-text"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          ✨ Please visit our store at Gandhi Road for exclusive collections ✨ &nbsp;&nbsp;&nbsp;&nbsp; ✨ Quality and Luxury in Every Stitch ✨
        </motion.div>
      </div>

      <div className="shop-layout">
        <aside className="sidebar">
          <div className="sidebar-inner">
            <h3 className="filter-title">Filter Collections</h3>
            <ul className="filter-list">
              {categories.map((cat) => (
                <motion.li 
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  className={filter === cat ? 'filter-box active' : 'filter-box'}
                  onClick={() => setFilter(cat)}
                >
                   {cat}
                </motion.li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="product-section">
          <motion.header 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="shop-header"
          >
            <span className="breadcrumb">Darshan Bag House / {filter}</span>
            <h2>{filter} Range</h2>
            <div className="header-line"></div>
          </motion.header>

          <motion.div layout className="product-grid">
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map((product) => (
                <motion.div 
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="shop-card"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="shop-img-container">
                    <img src={product.img} alt={product.name} />
                  </div>
                  <div className="shop-info">
                    <span className="cat-label">{product.category}</span>
                    <h4>{product.name}</h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            className="zoom-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              className="zoom-content"
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="zoom-img-box">
                <img src={selectedProduct.img} alt={selectedProduct.name} />
              </div>
              <div className="zoom-details">
                <span className="gold-text">{selectedProduct.category}</span>
                <h3>{selectedProduct.name}</h3>
                <p>Exclusive handcrafted piece from Darshan Bag House. Designed for durability, style, and luxury. Visit us at Gandhi Road for more details.</p>
                <button className="close-btn" onClick={() => setSelectedProduct(null)}>Back to Shop</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;