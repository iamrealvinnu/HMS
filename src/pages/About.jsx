import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaUtensils, FaUsers, FaAward } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaLeaf className="text-4xl text-ooty-gold" />,
      title: "Fresh Ingredients",
      description: "We source our ingredients directly from local Nilgiri farmers"
    },
    {
      icon: <FaUtensils className="text-4xl text-ooty-gold" />,
      title: "Traditional Recipes",
      description: "Our recipes are passed down through generations of Ooty families"
    },
    {
      icon: <FaUsers className="text-4xl text-ooty-gold" />,
      title: "Expert Chefs",
      description: "Our chefs are masters of both local and fusion cuisine"
    },
    {
      icon: <FaAward className="text-4xl text-ooty-gold" />,
      title: "Quality Assured",
      description: "Multiple awards for excellence in food quality and service"
    }
  ];

  return (
    <div className="pt-32 pb-16 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Founded in the heart of Ooty, FusionFood brings together the best of
              traditional hill station cuisine with modern culinary innovations.
              Our journey began with a simple mission: to share the authentic
              flavors of the Nilgiris with the world.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-50 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="prose prose-lg"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Heritage</h2>
              <p className="text-gray-600 mb-4">
                Nestled in the scenic Nilgiri hills, our restaurant has been serving
                authentic hill station cuisine for over two decades. We take pride in
                preserving the traditional flavors while innovating with modern
                culinary techniques.
              </p>
              <p className="text-gray-600 mb-4">
                Our chefs specialize in creating unique fusion dishes that blend local
                Nilgiri ingredients with international cooking styles. Each dish tells
                a story of our rich cultural heritage and commitment to excellence.
              </p>
              <p className="text-gray-600">
                Today, we continue to serve our community with the same passion and
                dedication that we started with, making every meal a memorable
                experience for our guests.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;