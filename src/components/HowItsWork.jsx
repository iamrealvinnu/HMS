import React from 'react';
import { FaUtensils, FaTruck, FaClock, FaLeaf } from 'react-icons/fa';

const HowItsWork = () => {
  const features = [
    {
      icon: <FaLeaf className="text-5xl text-ooty-brown mb-4" />,
      title: 'Fresh Nilgiri Ingredients',
      description: 'Handpicked local ingredients from the hills of Ooty'
    },
    {
      icon: <FaUtensils className="text-5xl text-ooty-brown mb-4" />,
      title: 'Traditional Recipes',
      description: 'Authentic recipes passed down through generations'
    },
    {
      icon: <FaClock className="text-5xl text-ooty-brown mb-4" />,
      title: '30 Min Delivery',
      description: 'Quick delivery to your doorstep in Ooty'
    },
    {
      icon: <FaTruck className="text-5xl text-ooty-brown mb-4" />,
      title: 'Safe Packaging',
      description: 'Hygienically packed for a safe dining experience'
    }
  ];

  return (
    <section className="py-16 bg-[#FDF7F2]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-ooty-brown mb-4">
            The HMS Ooty Experience
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the perfect blend of traditional hill station flavors and modern convenience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-8 text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-lg"
            >
              <div className="flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-ooty-brown mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-ooty-brown hover:bg-ooty-brown/90 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors">
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItsWork;