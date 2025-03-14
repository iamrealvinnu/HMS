import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaFire, FaLeaf } from 'react-icons/fa';
import { useCart } from '../components/CartContext';

const Menu = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'thali', name: 'Thali Specials' },
    { id: 'biryani', name: 'Nilgiri Biryanis' },
    { id: 'curries', name: 'Hill Curries' },
    { id: 'desserts', name: 'Desserts' }
  ];

  const menuItems = [
    {
      id: 1,
      name: "Royal Nilgiri Thali",
      category: "thali",
      price: "₹399",
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      description: "A grand thali with 12 items including local specialties",
      image: "/images/ooty special.jpg"
    },
    {
      id: 2,
      name: "Mutton Biryani",
      category: "biryani",
      price: "₹349",
      rating: 4.8,
      isVeg: false,
      isSpicy: true,
      description: "Aromatic biryani with tender mutton pieces",
      image: "/images/nilgiri biryani.webp"
    },
    {
      id: 3,
      name: "Wild Mushroom Curry",
      category: "curries",
      price: "₹299",
      rating: 4.7,
      isVeg: true,
      isSpicy: true,
      description: "Local mushrooms in rich spicy gravy",
      image: "/images/mushroom curry.jpg"
    },
    {
      id: 4,
      name: "Hill Station Special",
      category: "curries",
      price: "₹349",
      rating: 4.8,
      isVeg: false,
      isSpicy: true,
      description: "Chef's special curry with premium ingredients",
      image: "/images/ooty hill station.webp"
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="pt-32 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Menu</h1>
        
        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 scrollbar-hide">
          <div className="flex space-x-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors
                  ${activeCategory === category.id 
                    ? 'bg-ooty-gold text-white' 
                    : 'bg-white text-gray-700 hover:bg-ooty-gold/10'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {item.isVeg ? (
                      <FaLeaf className="text-green-500" />
                    ) : (
                      <span className="text-red-500 text-sm font-semibold">Non-veg</span>
                    )}
                    {item.isSpicy && <FaFire className="text-red-500" />}
                  </div>
                  <div className="flex items-center bg-green-50 px-2 py-1 rounded">
                    <FaStar className="text-green-500 mr-1" />
                    <span className="text-sm font-medium text-green-700">{item.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-ooty-gold">{item.price}</span>
                  <button
                    onClick={() => {
                      addToCart(item);
                    }}
                    className="bg-ooty-gold text-white px-6 py-2 rounded-lg font-semibold 
                             hover:bg-ooty-gold/90 active:scale-95 transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;