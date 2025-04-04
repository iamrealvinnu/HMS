import React, { useState } from 'react';
import { FaStar, FaFire, FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useCart } from './CartContext';

const PopularDishes = () => {
  const { addToCart } = useCart();
  const [selectedDish, setSelectedDish] = useState(null);

  const dishes = [
    { id: 1, name: "Hill Station Special", price: "₹349", rating: 4.8, isVeg: false, isSpicy: true, description: "A chef's special curry with hill spices", image: "/images/ooty hill station.webp", addOns: ["Roti - ₹30", "Gravy - ₹50", "Extra Meat - ₹100", "Rice - ₹50"], notesPlaceholder: "e.g., Extra thick" },
    { id: 2, name: "Mutton Biryani", price: "₹349", rating: 4.8, isVeg: false, isSpicy: true, description: "Aromatic biryani with tender mutton", image: "/images/mutton-biryani.jpg", addOns: ["Raita - ₹40", "Extra Mutton - ₹100", "Boiled Egg - ₹20", "Gravy - ₹50"], notesPlaceholder: "e.g., Extra spicy" },
    { id: 3, name: "Masala Dosa", price: "₹149", rating: 4.7, isVeg: true, isSpicy: false, description: "Crispy dosa with spiced potato filling", image: "/images/masala-dosa.webp", addOns: ["Extra Chutney - ₹20", "Ghee - ₹30", "Sambar - ₹35", "Cheese - ₹50"], notesPlaceholder: "e.g., Crispy" },
  ];

  const handleAddToCartClick = (dish) => {
    setSelectedDish({ ...dish, notes: '', selectedAddOns: [] });
  };

  const handleAddToCartConfirm = () => {
    if (selectedDish) {
      addToCart({
        ...selectedDish,
        price: calculateTotalPrice(selectedDish),
        addOns: selectedDish.selectedAddOns,
        notes: selectedDish.notes,
      });
      setSelectedDish(null);
    }
  };

  const calculateTotalPrice = (dish) => {
    const basePrice = parseFloat(dish.price.replace('₹', ''));
    const addOnsPrice = dish.selectedAddOns.reduce((sum, addOn) => {
      const priceMatch = addOn.match(/₹(\d+)/);
      return priceMatch ? sum + parseFloat(priceMatch[1]) : sum;
    }, 0);
    return `₹${basePrice + addOnsPrice}`;
  };

  const toggleAddOn = (addOn) => {
    setSelectedDish(prev => ({
      ...prev,
      selectedAddOns: prev.selectedAddOns.includes(addOn)
        ? prev.selectedAddOns.filter(item => item !== addOn)
        : [...prev.selectedAddOns, addOn]
    }));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Popular Dishes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dishes.map((dish) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-72 overflow-hidden">
                <img src={dish.image} alt={dish.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {dish.isVeg ? <FaLeaf className="text-green-500" /> : <span className="text-red-500 text-sm font-semibold">Non-veg</span>}
                    {dish.isSpicy && <FaFire className="text-red-500" />}
                  </div>
                  <div className="flex items-center bg-green-50 px-2 py-1 rounded">
                    <FaStar className="text-green-500 mr-1" />
                    <span className="text-sm font-medium text-green-700">{dish.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{dish.name}</h3>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">{dish.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-ooty-gold">{dish.price}</span>
                  <button
                    onClick={() => handleAddToCartClick(dish)}
                    className="bg-ooty-gold text-white px-4 py-1 rounded-lg font-semibold hover:bg-ooty-gold/90 active:scale-95 transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          >
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedDish.name}</h3>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Add-ons</label>
                <div className="space-y-3">
                  {selectedDish.addOns.map((addOn, index) => (
                    <label key={index} className="flex items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedDish.selectedAddOns.includes(addOn)}
                        onChange={() => toggleAddOn(addOn)}
                        className="w-5 h-5 text-ooty-gold border-gray-300 rounded focus:ring-ooty-gold"
                      />
                      <span className="ml-3 text-gray-700">{addOn}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={selectedDish.notes}
                  onChange={(e) => setSelectedDish({ ...selectedDish, notes: e.target.value })}
                  placeholder={selectedDish.notesPlaceholder}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-ooty-gold focus:border-ooty-gold resize-none shadow-sm"
                  rows="3"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-ooty-gold">{calculateTotalPrice(selectedDish)}</span>
                <div className="space-x-3">
                  <button
                    onClick={() => setSelectedDish(null)}
                    className="px-4 py-2 text-gray-600 border rounded-full hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddToCartConfirm}
                    className="bg-ooty-gold text-white px-6 py-2 rounded-full font-semibold hover:bg-ooty-gold/90 transition-colors shadow-md"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PopularDishes;