import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './components/home'
import Shop from './components/shop'
import Contact from './components/contact'
import Footer from './components/footer'
import React from 'react'
import Premium from './components/Premium'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main" aria-label="Page content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}


export default App

