import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaFire, FaLeaf, FaHeart } from 'react-icons/fa';
import { useCart } from './CartContext';

const PopularDishes = () => {
  const { addToCart } = useCart();

  const dishes = [
    {
      name: "Nilgiri Biryani",
      price: "₹299",
      rating: 4.8,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      description: "Aromatic rice cooked with fresh hill spices and seasonal vegetables",
      image: "/images/nilgiri biryani.webp"
    },
    {
      name: "Ooty Special Thali",
      price: "₹399",
      rating: 4.9,
      isVeg: true,
      isSpicy: false,
      isBestseller: true,
      description: "Complete meal with variety of curries, dal, and dessert",
      image: "/images/ooty special.jpg"
    },
    {
      name: "Mountain Mushroom Curry",
      price: "₹249",
      rating: 4.7,
      isVeg: true,
      isSpicy: true,
      isBestseller: false,
      description: "Fresh mushrooms in a rich, creamy gravy with local herbs",
      image: "/images/mushroom curry.jpg"
    },
    {
      name: "Hill Station Special",
      price: "₹349",
      rating: 4.8,
      isVeg: false,
      isSpicy: true,
      isBestseller: true,
      description: "Chef's special preparation with premium ingredients",
      image: "/images/ooty hill station.webp"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Popular Dishes</h2>
          <div className="w-20 h-1 bg-ooty-gold mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dishes.map((dish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => alert('Vegetarian dish')} className="cursor-pointer">
                      {dish.isVeg && <FaLeaf className="text-green-500" />}
                    </button>
                    <button onClick={() => alert('Spicy dish')} className="cursor-pointer">
                      {dish.isSpicy && <FaFire className="text-red-500" />}
                    </button>
                    <button onClick={() => alert('Bestseller')} className="cursor-pointer">
                      {dish.isBestseller && <FaHeart className="text-ooty-gold" />}
                    </button>
                  </div>
                  <button 
                    onClick={() => alert(`Rating: ${dish.rating}/5`)}
                    className="flex items-center bg-green-50 px-2 py-1 rounded cursor-pointer"
                  >
                    <FaStar className="text-green-500 mr-1" />
                    <span className="text-sm font-medium text-green-700">{dish.rating}</span>
                  </button>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">{dish.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{dish.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-ooty-gold">{dish.price}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-ooty-gold text-white px-4 py-2 rounded-full text-sm font-medium"
                    onClick={() => addToCart(dish)}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;