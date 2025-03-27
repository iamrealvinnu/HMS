import React from 'react';
import { FaUtensils, FaClock, FaLeaf, FaTruck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: <FaUtensils className="text-4xl text-ooty-gold" />,
      title: "Authentic Hill Cuisine",
      description: "Experience the true taste of Nilgiri's finest dishes prepared by expert chefs"
    },
    {
      icon: <FaClock className="text-4xl text-ooty-gold" />,
      title: "Quick Delivery",
      description: "Swift delivery to your doorstep within 30 minutes across Ooty"
    },
    {
      icon: <FaLeaf className="text-4xl text-ooty-gold" />,
      title: "Fresh Ingredients",
      description: "Locally sourced ingredients from the hills ensuring maximum freshness"
    },
    {
      icon: <FaTruck className="text-4xl text-ooty-gold" />,
      title: "Free Delivery",
      description: "Complimentary delivery on orders above ₹500 within Ooty"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
          <div className="w-20 h-1 bg-ooty-gold mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-50 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;