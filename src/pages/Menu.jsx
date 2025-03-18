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
    { id: 'biryani', name: 'Biryanis' },
    { id: 'dosa', name: 'Dosas' },
    { id: 'meals', name: 'Meals' },
    { id: 'curries', name: 'Hill Curries' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'beverages', name: 'Beverages' },
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
      image: "/images/mutton-biryani.jpg"
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
    },
    {
      id: 5,
      name: "Chicken Biryani",
      category: "biryani",
      price: "₹299",
      rating: 4.8,
      isVeg: false,
      isSpicy: true,
      description: "Aromatic basmati rice cooked with tender chicken and special spices",
      image: "/images/chicken-biryani.jpg"
    },
    {
      id: 6,
      name: "Masala Dosa",
      category: "dosa",
      price: "₹149",
      rating: 4.7,
      isVeg: true,
      isSpicy: false,
      description: "Crispy dosa with spiced potato filling, served with sambar and chutneys",
      image: "/images/masala-dosa.webp"
    },
    {
      id: 7,
      name: "Ghee Roast",
      category: "dosa",
      price: "₹169",
      rating: 4.6,
      isVeg: true,
      isSpicy: false,
      description: "Extra crispy dosa roasted in ghee until golden brown",
      image: "/images/ghee-roast.jpg"
    },
    {
      id: 8,
      name: "South Indian Thali",
      category: "meals",
      price: "₹299",
      rating: 4.8,
      isVeg: true,
      isSpicy: false,
      description: "Complete meal with rice, dal, sambar, rasam, and 4 varieties of curries",
      image: "/images/south-indian-thali.jpg"
    },
    {
      id: 9,
      name: "Executive Meals",
      category: "meals",
      price: "₹249",
      rating: 4.5,
      isVeg: true,
      isSpicy: false,
      description: "Rice, dal, 2 curries, papad, and dessert",
      image: "/images/executive-meals.jpg"
    },
    {
      id: 10,
      name: "Chicken 65",
      category: "appetizers",
      price: "₹249",
      rating: 4.7,
      isVeg: false,
      isSpicy: true,
      description: "Spicy and crispy chicken fritters with curry leaves",
      image: "/images/chicken-65.webp"
    },
    {
      id: 11,
      name: "Gobi Manchurian",
      category: "appetizers",
      price: "₹199",
      rating: 4.6,
      isVeg: true,
      isSpicy: true,
      description: "Crispy cauliflower in Indo-Chinese sauce",
      image: "/images/gobi-manchurian.jpg"
    },
    {
      id: 12,
      name: "Masala Chai",
      category: "beverages",
      price: "₹49",
      rating: 4.5,
      isVeg: true,
      isSpicy: false,
      description: "Traditional Indian spiced tea",
      image: "/images/masala-chai.jpg"
    },
    {
      id: 13,
      name: "Fresh Lime Soda",
      category: "beverages",
      price: "₹79",
      rating: 4.4,
      isVeg: true,
      isSpicy: false,
      description: "Refreshing lime soda with mint leaves",
      image: "/images/lime-soda.jpg"
    },
    {
      id: 16,
      name: "Nilgiri Tea",
      category: "beverages",
      price: "₹59",
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      description: "Premium mountain-grown black tea from Ooty's finest estates",
      image: "/images/nilgiri-tea.webp"
    },
    {
      id: 17,
      name: "Hot Chocolate",
      category: "beverages",
      price: "₹129",
      rating: 4.7,
      isVeg: true,
      isSpicy: false,
      description: "Rich and creamy hot chocolate perfect for Ooty's cool weather",
      image: "/images/hot-chocolate.jpg"
    },
    {
      id: 18,
      name: "Mountain Green Tea",
      category: "beverages",
      price: "₹69",
      rating: 4.6,
      isVeg: true,
      isSpicy: false,
      description: "Organic green tea from local plantations with natural herbs",
      image: "/images/green-tea.jpg"
    },
    {
      id: 19,
      name: "Nilgiri Filter Coffee",
      category: "beverages",
      price: "₹89",
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      description: "Traditional South Indian filter coffee made with locally sourced Nilgiri coffee beans",
      image: "/images/filter-coffee.jpg"
    },
    {
      id: 20,
      name: "Cafe Mocha",
      category: "beverages",
      price: "₹149",
      rating: 4.7,
      isVeg: true,
      isSpicy: false,
      description: "Rich espresso with chocolate and steamed milk, topped with cocoa powder",
      image: "/images/cafe-mocha.avif"
    },
    {
      id: 21,
      name: "Cold Coffee",
      category: "beverages",
      price: "₹129",
      rating: 4.8,
      isVeg: true,
      isSpicy: false,
      description: "Chilled blend of Nilgiri coffee with cream and ice cream",
      image: "/images/cold-coffee.jpg"
    },
    {
      id: 14,
      name: "Gulab Jamun",
      category: "desserts",
      price: "₹99",
      rating: 4.8,
      isVeg: true,
      isSpicy: false,
      description: "Soft milk dumplings in sugar syrup",
      image: "/images/gulab-jamun.jpg"
    },
    {
      id: 15,
      name: "Rasmalai",
      category: "desserts",
      price: "₹129",
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      description: "Soft cottage cheese dumplings in saffron milk",
      image: "/images/rasmalai.webp"
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