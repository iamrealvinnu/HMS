import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Carousel = () => {
  const slides = [
    {
      image: '/images/hero1.jpg',
      title: 'Fusion',
      subtitle: 'Delights',
      description: 'Where tradition meets modern flavors',
      tag: 'SIGNATURE COLLECTION'
    },
    {
      image: '/images/hero2.jpg',
      title: 'Royal',
      subtitle: 'Feasts',
      description: 'Experience the luxury of hill station cuisine',
      tag: 'CHEF\'S SPECIAL'
    },
    {
      image: '/images/hero3.jpg',
      title: 'Premium',
      subtitle: 'Platters',
      description: 'Perfect for celebrations and gatherings',
      tag: 'BESTSELLER'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Slides */}
      <div 
        className="relative h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="relative min-w-full h-full">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50 z-10" />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative z-20 h-full flex items-center pt-20">
                <div className="container mx-auto px-4">
                  <div className="max-w-xl">
                    {/* Tag */}
                    <div className="inline-block mb-6">
                      <span className="bg-ooty-gold/10 text-ooty-gold px-4 py-1.5 text-sm tracking-wider border-2 border-ooty-gold font-medium">
                        {slide.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-white">
                      <span className="block text-6xl md:text-7xl font-bold mb-2 drop-shadow-lg">{slide.title}</span>
                      <span className="block text-7xl md:text-8xl font-bold text-ooty-gold mb-6 drop-shadow-lg">{slide.subtitle}</span>
                    </h2>

                    {/* Description */}
                    <p className="text-gray-100 text-xl mb-8 drop-shadow-md max-w-lg">
                      {slide.description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex gap-4">
                      <Link 
                        to="/menu" 
                        className="bg-ooty-gold hover:bg-ooty-gold/90 text-black px-8 py-3 rounded-none text-lg font-semibold transition-colors"
                      >
                        Order Now
                      </Link>
                      <button 
                        className="border-2 border-ooty-gold text-ooty-gold hover:bg-ooty-gold/10 px-8 py-3 rounded-none text-lg font-semibold transition-colors"
                        onClick={() => window.location.href = '#menu'}
                      >
                        View Menu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentIndex ? 'bg-ooty-gold' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-800">
        <div
          className="h-full bg-ooty-gold transition-all duration-[5000ms] ease-linear"
          style={{
            width: `${((currentIndex + 1) / slides.length) * 100}%`,
            transform: 'translateX(0)'
          }}
        />
      </div>
    </div>
  );
};

export default Carousel;