import React, { useState } from 'react';
import { motion } from 'framer-motion'; // For smooth animations
import { FaStar, FaFire, FaLeaf } from 'react-icons/fa'; // Icons for ratings, spicy, and veg indicators
import { useCart } from '../components/CartContext'; // Custom hook to manage cart state

// Menu component to display food items and handle cart interactions
const Menu = () => {
  const { addToCart } = useCart(); // Access addToCart function from CartContext
  const [activeCategory, setActiveCategory] = useState('all'); // Track the selected category, defaults to 'all'
  const [selectedDish, setSelectedDish] = useState(null); // Store the dish being customized in the modal

  // List of categories for filtering menu items
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'thali', name: 'Thali Specials' },
    { id: 'biryani', name: 'Biryanis' },
    { id: 'dosa', name: 'Dosas' },
    { id: 'meals', name: 'Meals' },
    { id: 'curries', name: 'Hill Curries' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'desserts', name: 'Desserts' },
  ];

  // Array of menu items with details like price, category, and add-ons
  const menuItems = [
    { id: 1, name: "Royal Nilgiri Thali", category: "thali", price: "₹399", rating: 4.9, isVeg: true, isSpicy: false, description: "A grand thali with 12 items", image: "/images/ooty special.jpg", addOns: ["Extra Papad - ₹20", "Ghee - ₹30", "Pickle - ₹25", "Extra Dal - ₹40"], notesPlaceholder: "e.g., Less salt" },
    { id: 2, name: "South Indian Thali", category: "thali", price: "₹379", rating: 4.8, isVeg: true, isSpicy: false, description: "Traditional South Indian feast", image: "/images/south-indian-thali.jpg", addOns: ["Extra Rice - ₹50", "Curd - ₹30", "Sambar - ₹35", "Rasam - ₹30"], notesPlaceholder: "e.g., No onions" },
    { id: 3, name: "Non-Veg Hill Thali", category: "thali", price: "₹449", rating: 4.9, isVeg: false, isSpicy: true, description: "Spicy meat feast with hill flavors", image: "/images/non-veg-thali.jpg", addOns: ["Extra Chicken - ₹80", "Fish Fry - ₹100", "Gravy - ₹50"], notesPlaceholder: "e.g., Extra spicy" },
    { id: 4, name: "Mutton Biryani", category: "biryani", price: "₹349", rating: 4.8, isVeg: false, isSpicy: true, description: "Aromatic biryani with tender mutton", image: "/images/mutton-biryani.jpg", addOns: ["Raita - ₹40", "Extra Mutton - ₹100", "Boiled Egg - ₹20", "Gravy - ₹50"], notesPlaceholder: "e.g., Extra spicy" },
    { id: 5, name: "Chicken Biryani", category: "biryani", price: "₹299", rating: 4.8, isVeg: false, isSpicy: true, description: "Flavorful chicken biryani", image: "/images/chicken-biryani.jpg", addOns: ["Egg - ₹20", "Gravy - ₹50", "Raita - ₹40", "Extra Chicken - ₹80"], notesPlaceholder: "e.g., Mild flavor" },
    { id: 6, name: "Veg Nilgiri Biryani", category: "biryani", price: "₹279", rating: 4.7, isVeg: true, isSpicy: true, description: "Vegetable biryani with hill spices", image: "/images/nilgiri biryani.webp", addOns: ["Paneer - ₹60", "Raita - ₹40", "Extra Veggies - ₹30", "Ghee - ₹30"], notesPlaceholder: "e.g., Extra veggies" },
    { id: 7, name: "Prawn Biryani", category: "biryani", price: "₹369", rating: 4.8, isVeg: false, isSpicy: true, description: "Spicy prawn biryani", image: "/images/prawn-biryani.jpg", addOns: ["Extra Prawns - ₹120", "Raita - ₹40", "Lemon Wedge - ₹10"], notesPlaceholder: "e.g., Less oil" },
    { id: 8, name: "Masala Dosa", category: "dosa", price: "₹149", rating: 4.7, isVeg: true, isSpicy: false, description: "Crispy dosa with spiced potato filling", image: "/images/masala-dosa.webp", addOns: ["Extra Chutney - ₹20", "Ghee - ₹30", "Sambar - ₹35", "Cheese - ₹50"], notesPlaceholder: "e.g., Crispy" },
    { id: 9, name: "Ghee Roast", category: "dosa", price: "₹169", rating: 4.6, isVeg: true, isSpicy: false, description: "Ghee-roasted crispy dosa", image: "/images/ghee-roast.jpg", addOns: ["Sambar - ₹30", "Cheese - ₹50", "Extra Ghee - ₹30", "Chutney - ₹20"], notesPlaceholder: "e.g., Less ghee" },
    { id: 10, name: "Paneer Dosa", category: "dosa", price: "₹189", rating: 4.8, isVeg: true, isSpicy: false, description: "Dosa stuffed with paneer", image: "/images/paneer-dosa.jpg", addOns: ["Extra Paneer - ₹60", "Chutney - ₹20", "Sambar - ₹35", "Spicy Masala - ₹25"], notesPlaceholder: "e.g., Mild" },
    { id: 11, name: "Chicken Keema Dosa", category: "dosa", price: "₹229", rating: 4.7, isVeg: false, isSpicy: true, description: "Dosa with spicy chicken filling", image: "/images/chicken-dosa.jpg", addOns: ["Extra Chicken - ₹80", "Cheese - ₹50", "Gravy - ₹50"], notesPlaceholder: "e.g., Extra spicy" },
    { id: 12, name: "Executive Meals", category: "meals", price: "₹249", rating: 4.5, isVeg: true, isSpicy: false, description: "Balanced meal with rice and curries", image: "/images/executive-meals.jpg", addOns: ["Dessert - ₹50", "Papad - ₹20", "Extra Rice - ₹50", "Curd - ₹30"], notesPlaceholder: "e.g., No spice" },
    { id: 13, name: "Non-Veg Meal", category: "meals", price: "₹299", rating: 4.7, isVeg: false, isSpicy: true, description: "Chicken curry with rice", image: "/images/non-veg-meal.jpg", addOns: ["Extra Chicken - ₹80", "Curd - ₹30", "Fish Fry - ₹100", "Gravy - ₹50"], notesPlaceholder: "e.g., Extra gravy" },
    { id: 14, name: "Veg Combo Meal", category: "meals", price: "₹229", rating: 4.6, isVeg: true, isSpicy: false, description: "Rice with mixed veg curry", image: "/images/veg-combo.jpg", addOns: ["Paneer - ₹60", "Papad - ₹20", "Extra Dal - ₹40"], notesPlaceholder: "e.g., Less oil" },
    { id: 15, name: "Wild Mushroom Curry", category: "curries", price: "₹299", rating: 4.7, isVeg: true, isSpicy: true, description: "Local mushrooms in spicy gravy", image: "/images/mushroom curry.jpg", addOns: ["Rice - ₹50", "Naan - ₹40", "Extra Mushrooms - ₹60", "Ghee - ₹30"], notesPlaceholder: "e.g., Less spicy" },
    { id: 16, name: "Hill Station Special", category: "curries", price: "₹349", rating: 4.8, isVeg: false, isSpicy: true, description: "Chef's special curry", image: "/images/ooty hill station.webp", addOns: ["Roti - ₹30", "Gravy - ₹50", "Extra Meat - ₹100", "Rice - ₹50"], notesPlaceholder: "e.g., Extra thick" },
    { id: 17, name: "Pepper Chicken Curry", category: "curries", price: "₹329", rating: 4.8, isVeg: false, isSpicy: true, description: "Spicy chicken with black pepper", image: "/images/pepper-chicken.jpg", addOns: ["Naan - ₹40", "Rice - ₹50", "Extra Chicken - ₹80"], notesPlaceholder: "e.g., Less pepper" },
    { id: 18, name: "Chicken 65", category: "appetizers", price: "₹249", rating: 4.7, isVeg: false, isSpicy: true, description: "Spicy chicken fritters", image: "/images/chicken-65.webp", addOns: ["Sauce - ₹30", "Extra Chicken - ₹80", "Lemon Wedge - ₹10", "Onion Rings - ₹20"], notesPlaceholder: "e.g., Extra crispy" },
    { id: 19, name: "Gobi Manchurian", category: "appetizers", price: "₹199", rating: 4.6, isVeg: true, isSpicy: true, description: "Crispy cauliflower in sauce", image: "/images/gobi-manchurian.jpg", addOns: ["Extra Sauce - ₹30", "Spring Onions - ₹20", "Bell Peppers - ₹25"], notesPlaceholder: "e.g., Less oil" },
    { id: 20, name: "Paneer Tikka", category: "appetizers", price: "₹229", rating: 4.8, isVeg: true, isSpicy: true, description: "Grilled paneer cubes", image: "/images/paneer-tikka.jpg", addOns: ["Extra Paneer - ₹60", "Mint Chutney - ₹20", "Onion Rings - ₹20"], notesPlaceholder: "e.g., Well grilled" },
    { id: 21, name: "Nilgiri Tea", category: "beverages", price: "₹59", rating: 4.9, isVeg: true, isSpicy: false, description: "Premium black tea", image: "/images/nilgiri-tea.webp", addOns: ["Sugar - Free", "Milk - ₹20", "Honey - ₹25", "Lemon - ₹15"], notesPlaceholder: "e.g., Strong" },
    { id: 22, name: "Cold Coffee", category: "beverages", price: "₹129", rating: 4.8, isVeg: true, isSpicy: false, description: "Chilled coffee with cream", image: "/images/cold-coffee.jpg", addOns: ["Ice Cream - ₹40", "Whipped Cream - ₹30", "Chocolate Syrup - ₹20"], notesPlaceholder: "e.g., Less sugar" },
    { id: 23, name: "Fresh Lime Soda", category: "beverages", price: "₹99", rating: 4.7, isVeg: true, isSpicy: false, description: "Refreshing lime soda", image: "/images/lime-soda.jpg", addOns: ["Salt - Free", "Sugar - ₹10", "Mint - ₹15"], notesPlaceholder: "e.g., Extra fizzy" },
    { id: 24, name: "Gulab Jamun", category: "desserts", price: "₹99", rating: 4.8, isVeg: true, isSpicy: false, description: "Soft milk dumplings", image: "/images/gulab-jamun.jpg", addOns: ["Extra Syrup - ₹20", "Ice Cream - ₹40", "Nuts - ₹30"], notesPlaceholder: "e.g., Warm" },
    { id: 25, name: "Rasmalai", category: "desserts", price: "₹129", rating: 4.9, isVeg: true, isSpicy: false, description: "Cheese dumplings in saffron milk", image: "/images/rasmalai.webp", addOns: ["Extra Milk - ₹30", "Nuts - ₹40", "Saffron - ₹20"], notesPlaceholder: "e.g., Chilled" },
    { id: 26, name: "Chocolate Lava Cake", category: "desserts", price: "₹149", rating: 4.8, isVeg: true, isSpicy: false, description: "Warm cake with molten center", image: "/images/lava-cake.jpg", addOns: ["Ice Cream - ₹40", "Chocolate Sauce - ₹20", "Sprinkles - ₹15"], notesPlaceholder: "e.g., Extra gooey" },
  ];

  // Filter menu items based on the active category
  const filteredItems = activeCategory === 'all' ? menuItems : menuItems.filter(item => item.category === activeCategory);

  // Open the customization modal when "Add to Cart" is clicked
  const handleAddToCartClick = (item) => {
    setSelectedDish({ ...item, notes: '', selectedAddOns: [] }); // Initialize with empty notes and add-ons
  };

  // Confirm adding the customized dish to the cart
  const handleAddToCartConfirm = () => {
    if (selectedDish) {
      addToCart({
        ...selectedDish,
        price: calculateTotalPrice(selectedDish), // Update price with add-ons
        addOns: selectedDish.selectedAddOns, // Include selected add-ons
        notes: selectedDish.notes, // Include customer notes
      });
      setSelectedDish(null); // Close the modal after adding
    }
  };

  // Calculate total price including base price and selected add-ons
  const calculateTotalPrice = (dish) => {
    const basePrice = parseFloat(dish.price.replace('₹', '')); // Remove currency symbol and convert to number
    const addOnsPrice = dish.selectedAddOns.reduce((sum, addOn) => {
      const priceMatch = addOn.match(/₹(\d+)/); // Extract price from add-on string (e.g., "Ghee - ₹30")
      return priceMatch ? sum + parseFloat(priceMatch[1]) : sum; // Add price if found, otherwise keep sum
    }, 0);
    return `₹${basePrice + addOnsPrice}`; // Return total with currency symbol
  };

  // Toggle add-on selection for the selected dish
  const toggleAddOn = (addOn) => {
    setSelectedDish(prev => ({
      ...prev,
      selectedAddOns: prev.selectedAddOns.includes(addOn)
        ? prev.selectedAddOns.filter(item => item !== addOn) // Remove if already selected
        : [...prev.selectedAddOns, addOn] // Add if not selected
    }));
  };

  // Render the menu UI
  return (
    <div className="pt-32 pb-16 min-h-screen bg-gray-50"> {/* Main container with padding and background */}
      <div className="container mx-auto px-4"> {/* Center content with responsive padding */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Menu</h1> {/* Page title */}

        {/* Category filter buttons */}
        <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 scrollbar-hide">
          <div className="flex space-x-4"> {/* Horizontal scrollable category list */}
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)} // Set active category on click
                className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors
                  ${activeCategory === category.id ? 'bg-ooty-gold text-white' : 'bg-white text-gray-700 hover:bg-ooty-gold/10'}`} // Highlight active category
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Responsive grid layout */}
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }} // Fade-in animation on load
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden" // Card styling
            >
              <div className="h-64 overflow-hidden"> {/* Image container */}
                <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" /> {/* Zoom effect on hover */}
              </div>
              <div className="p-4"> {/* Card content */}
                <div className="flex items-center justify-between mb-2"> {/* Icons and rating */}
                  <div className="flex items-center space-x-2">
                    {item.isVeg ? <FaLeaf className="text-green-500" /> : <span className="text-red-500 text-sm font-semibold">Non-veg</span>} {/* Veg/Non-veg indicator */}
                    {item.isSpicy && <FaFire className="text-red-500" />} {/* Spicy indicator */}
                  </div>
                  <div className="flex items-center bg-green-50 px-2 py-1 rounded"> {/* Rating badge */}
                    <FaStar className="text-green-500 mr-1" />
                    <span className="text-sm font-medium text-green-700">{item.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3> {/* Item name */}
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">{item.description}</p> {/* Truncated description */}
                <div className="flex items-center justify-between"> {/* Price and button */}
                  <span className="text-xl font-bold text-ooty-gold">{item.price}</span>
                  <button
                    onClick={() => handleAddToCartClick(item)} // Open modal for customization
                    className="bg-ooty-gold text-white px-4 py-1 rounded-lg font-semibold hover:bg-ooty-gold/90 active:scale-95 transition-all" // Styled button
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Customization modal */}
        {selectedDish && (
          <motion.div
            initial={{ opacity: 0 }} // Fade-in effect
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" // Overlay styling
          >
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"> {/* Modal content */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedDish.name}</h3> {/* Dish name */}
              <div className="mb-6"> {/* Add-ons section */}
                <label className="block text-sm font-medium text-gray-700 mb-2">Add-ons</label>
                <div className="space-y-3">
                  {selectedDish.addOns.map((addOn, index) => (
                    <label key={index} className="flex items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"> {/* Add-on option */}
                      <input
                        type="checkbox"
                        checked={selectedDish.selectedAddOns.includes(addOn)} // Check if selected
                        onChange={() => toggleAddOn(addOn)} // Toggle add-on selection
                        className="w-5 h-5 text-ooty-gold border-gray-300 rounded focus:ring-ooty-gold" // Styled checkbox
                      />
                      <span className="ml-3 text-gray-700">{addOn}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-6"> {/* Notes section */}
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={selectedDish.notes}
                  onChange={(e) => setSelectedDish({ ...selectedDish, notes: e.target.value })} // Update notes
                  placeholder={selectedDish.notesPlaceholder} // Custom placeholder
                  className="w-full px-4 py-2 border rounded-lg focus:ring-ooty-gold focus:border-ooty-gold resize-none shadow-sm" // Styled textarea
                  rows="3"
                />
              </div>
              <div className="flex justify-between items-center"> {/* Footer with price and buttons */}
                <span className="text-xl font-bold text-ooty-gold">{calculateTotalPrice(selectedDish)}</span> {/* Total price */}
                <div className="space-x-3">
                  <button
                    onClick={() => setSelectedDish(null)} // Close modal without saving
                    className="px-4 py-2 text-gray-600 border rounded-full hover:bg-gray-100 transition-colors" // Cancel button
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddToCartConfirm} // Add to cart and close modal
                    className="bg-ooty-gold text-white px-6 py-2 rounded-full font-semibold hover:bg-ooty-gold/90 transition-colors shadow-md" // Confirm button
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Menu; // Export the component for use in other parts of the app