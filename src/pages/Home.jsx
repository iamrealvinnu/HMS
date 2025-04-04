import React, { useState, useEffect } from "react";
import { FiPhoneCall } from "react-icons/fi";
import HowItsWork from "../components/HowItsWork";
import Carousel from "../components/Carousel";
import { motion } from "framer-motion";

function Home() {
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    setShowOffer(true); // Show offer popup on page load
  }, []);

  const closeOffer = () => setShowOffer(false);

  return (
    <div>
      {/* Offer Popup */}
      {showOffer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeOffer}></div>
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg z-10 text-center">
            <h2 className="text-2xl font-bold text-ooty-brown mb-4">Special Offers!</h2>
            <p className="text-gray-600 mb-4">Get 20% OFF on your first order with code: <span className="font-bold text-ooty-gold">OOTY20</span></p>
            <p className="text-gray-600 mb-6">Free Delivery on orders above ₹500!</p>
            <button
              onClick={closeOffer}
              className="bg-ooty-gold text-white px-6 py-2 rounded-full font-semibold hover:bg-ooty-gold/90 transition-colors"
            >
              Got It!
            </button>
          </div>
        </motion.div>
      )}

      <div className="p-2">
        <Carousel />
      </div>
      <div className="p-2">
        <div className="md:flex gap-4 py-2">
          <div className="md:w-1/2 p-5">
            <div className="flex gap-3 bg-ooty-wheat w-36 px-2 items-center rounded-full">
              <p className="text-sm px-2 py-1 font-medium text-ooty-brown">Hill Delivery</p>
              <img src="/assets/bike-delivery.png" className="h-7" alt="Scooter Delivery" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold py-3">
              Fresh Ooty Flavors At{" "}
              <span className="text-ooty-orange font-bold">Your Doorstep</span>
            </h2>
            <p className="py-3 text-base">
              Savor the taste of the Nilgiris with HMS. From spicy hill-style biryanis to tea-infused delights, we bring Ooty’s finest home-cooked meals to you, fresh and fast.
            </p>
            <div className="bg-yellow-300 text-ooty-brown p-3 rounded-md mt-4 text-center">
              <p className="font-bold">Flat 20% OFF on First Order! Use Code: OOTY20</p>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <button className="font-bold bg-ooty-orange text-white px-4 py-2 rounded-md">
                Order Now
              </button>
              <div className="flex items-center gap-2">
                <FiPhoneCall className="text-ooty-orange text-xl" />
                <span className="text-lg font-semibold text-ooty-brown">+91 987 654 3210</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1607330288942-40906e682286?q=80&w=2070&auto=format&fit=crop"
              className="w-full max-w-md rounded-md"
              alt="Ooty Meal Delivery"
            />
          </div>
        </div>
        <HowItsWork />
      </div>
    </div>
  );
}

export default Home;