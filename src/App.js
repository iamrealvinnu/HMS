
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import Header from './components/Header';
import Carousel from './components/Carousel';
import PopularDishes from './components/PopularDishes';
import DeliveryProcess from './components/DeliveryProcess';
import Features from './components/Features';
import HowItsWork from './components/HowItsWork';
import Cart from './components/Cart';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Chatbot from './components/Chatbot';
import OrderTypeSelection from './pages/OrderTypeSelection';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <Cart />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Carousel />
                  <PopularDishes />
                  <DeliveryProcess />
                  <Features />
                  <HowItsWork />
                </>
              }
            />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order-type" element={<OrderTypeSelection />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Chatbot />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;