import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaUtensils, FaTruck, FaSmile } from 'react-icons/fa';

const DeliveryProcess = () => {
  const steps = [
    {
      icon: <FaSearch className="text-4xl text-ooty-gold" />,
      title: "Choose Your Meal",
      description: "Browse our menu and select your favorite hill station dishes"
    },
    {
      icon: <FaUtensils className="text-4xl text-ooty-gold" />,
      title: "We Cook Fresh",
      description: "Our chefs prepare your meal with fresh, local ingredients"
    },
    {
      icon: <FaTruck className="text-4xl text-ooty-gold" />,
      title: "Fast Delivery",
      description: "We deliver your order right to your doorstep"
    },
    {
      icon: <FaSmile className="text-4xl text-ooty-gold" />,
      title: "Enjoy Your Food",
      description: "Savor the authentic taste of Nilgiri cuisine"
    }
  ];

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <div className="w-20 h-1 bg-ooty-gold mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center relative"
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 left-1/2 w-full h-0.5 bg-ooty-gold/30"></div>
              )}

              {/* Step Number */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-20 h-20 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center border-2 border-ooty-gold"
              >
                {step.icon}
              </motion.div>

              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryProcess;