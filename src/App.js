import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Features from './components/Features';
import PopularDishes from './components/PopularDishes';
import DeliveryProcess from './components/DeliveryProcess';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <Carousel />
                <Features />
                <PopularDishes />
                <DeliveryProcess />
              </>
            } />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Cart />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;