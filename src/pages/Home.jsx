import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import HowItsWork from "../components/HowItsWork";
import Carousel from "../components/Carousel";

function Home() {
  return (
    <div>
      <div className="p-2">
        <Carousel />
      </div>
      <div className="p-2">
        <div className="md:flex gap-4 py-2">
          <div className="md:w-1/2 p-5">
            <div className="flex gap-3 bg-ooty-wheat w-36 px-2 items-center rounded-full">
              <p className="text-sm px-2 py-1 font-medium text-ooty-brown">
                Hill Delivery
              </p>
              <img
                src="/assets/bike-delivery.png" // Add to src/assets/
                className="h-7"
                alt="Scooter Delivery"
              />
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
                <span className="text-lg font-semibold text-ooty-brown">
                  +91 987 654 3210
                </span>
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