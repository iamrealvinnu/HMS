import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { useCart } from './CartContext';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, setIsCartOpen } = useCart();
  const location = useLocation();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  const shouldBeTransparent = isHomePage && !isScrolled;

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      shouldBeTransparent ? 'bg-transparent py-4' : 'bg-white shadow-md py-2'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/images/hmslogo.png" alt="FusionFood" className="h-12 w-auto" />
          
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/menu" 
              className={`font-medium transition-colors ${
                shouldBeTransparent ? 'text-white hover:text-ooty-gold' : 'text-gray-800 hover:text-ooty-gold'
              }`}
            >
              Menu
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-colors ${
                shouldBeTransparent ? 'text-white hover:text-ooty-gold' : 'text-gray-800 hover:text-ooty-gold'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-colors ${
                shouldBeTransparent ? 'text-white hover:text-ooty-gold' : 'text-gray-800 hover:text-ooty-gold'
              }`}
            >
              Contact
            </Link>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative group"
            >
              <FaShoppingCart className={`text-2xl transition-colors ${
                shouldBeTransparent ? 'text-white' : 'text-gray-800'
              } hover:text-ooty-gold`} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-ooty-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden ${shouldBeTransparent ? 'text-white' : 'text-gray-800'}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/menu" 
                className="text-gray-800 hover:text-ooty-gold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                to="/about" 
                className="text-gray-800 hover:text-ooty-gold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-800 hover:text-ooty-gold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
              <button 
                onClick={() => {
                  setIsCartOpen(true);
                  setMenuOpen(false);
                }}
                className="flex items-center justify-between text-gray-800 hover:text-ooty-gold transition-colors"
              >
                <span>Cart</span>
                {cartItemsCount > 0 && (
                  <span className="bg-ooty-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;