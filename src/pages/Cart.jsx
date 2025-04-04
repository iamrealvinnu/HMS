import React, { useState } from 'react';
import { FaShoppingCart, FaTimes } from 'react-icons/fa'; // Icons for cart and close buttons
import { useCart } from './CartContext'; // Custom hook to manage cart state and actions
import { useNavigate } from 'react-router-dom'; // Hook for programmatic navigation

// Cart component to display and manage items in the shopping cart
const Cart = () => {
  const { cart, removeFromCart, updateQuantity, setIsCartOpen } = useCart(); // Access cart data and methods from context
  const [isCartOpen, setIsCartOpenLocal] = useState(false); // Local state to toggle cart visibility
  const navigate = useNavigate(); // Initialize navigation function

  // Toggle cart visibility, syncing local state and context
  const toggleCart = () => {
    setIsCartOpenLocal(!isCartOpen); // Update local state
    setIsCartOpen(!isCartOpen); // Update context state for consistency
  };

  // Calculate subtotal of all items in the cart, including add-ons
  const subtotal = cart.reduce((sum, item) => {
    const basePrice = parseFloat(item.price.replace('₹', '')); // Remove currency symbol and convert to number
    const addOnsPrice = item.addOns.reduce((addSum, addOn) => {
      const priceMatch = addOn.match(/₹(\d+)/); // Extract price from add-on string (e.g., "Ghee - ₹30")
      return priceMatch ? addSum + parseFloat(priceMatch[1]) : addSum; // Add price if found
    }, 0);
    return sum + (basePrice + addOnsPrice) * item.quantity; // Multiply by quantity and add to total
  }, 0);

  // Handle checkout button click: close cart and navigate to order type page
  const handleCheckout = () => {
    setIsCartOpenLocal(false); // Close cart locally
    setIsCartOpen(false); // Close cart in context
    navigate('/ordertype'); // Redirect to order type selection
  };

  // Render the cart UI
  return (
    <>
      {/* Cart toggle button */}
      <button
        onClick={toggleCart} // Toggle cart visibility on click
        className="fixed top-4 right-4 bg-ooty-gold text-white p-3 rounded-full shadow-lg hover:bg-ooty-gold/90 transition-colors z-50" // Styled button with hover effect
      >
        <FaShoppingCart className="text-xl" /> {/* Cart icon */}
        {cart.length > 0 && ( // Show item count badge if cart is not empty
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cart.length} {/* Display number of items */}
          </span>
        )}
      </button>

      {/* Cart sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"> {/* Overlay with semi-transparent background */}
          <div className="bg-white w-full max-w-md h-full p-6 overflow-y-auto shadow-xl"> {/* Sidebar container */}
            <div className="flex justify-between items-center mb-6"> {/* Header with title and close button */}
              <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2> {/* Cart title */}
              <button onClick={toggleCart} className="text-gray-600 hover:text-gray-800"> {/* Close button */}
                <FaTimes className="text-xl" /> {/* Close icon */}
              </button>
            </div>

            {/* Cart content */}
            {cart.length === 0 ? ( // Check if cart is empty
              <p className="text-gray-600 text-center">Your cart is empty</p> // Empty cart message
            ) : (
              <>
                <div className="space-y-6"> {/* List of cart items */}
                  {cart.map((item, index) => {
                    const basePrice = parseFloat(item.price.replace('₹', '')); // Extract base price
                    const addOnsPrice = item.addOns.reduce((sum, addOn) => {
                      const priceMatch = addOn.match(/₹(\d+)/); // Extract add-on price
                      return priceMatch ? sum + parseFloat(priceMatch[1]) : sum; // Sum add-on prices
                    }, 0);
                    const totalItemPrice = (basePrice + addOnsPrice) * item.quantity; // Calculate total for this item

                    return (
                      <div key={index} className="flex items-start border-b pb-4"> {/* Individual cart item */}
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" /> {/* Item image */}
                        <div className="flex-1 ml-4"> {/* Item details */}
                          <h3 className="font-medium text-gray-800">{item.name}</h3> {/* Item name */}
                          <p className="text-sm text-gray-600">
                            ₹{(basePrice + addOnsPrice).toFixed(2)} × {item.quantity} = ₹{totalItemPrice.toFixed(2)} {/* Price breakdown */}
                          </p>
                          {item.addOns && item.addOns.length > 0 && ( // Show add-ons if present
                            <p className="text-xs text-gray-500">Add-ons: {item.addOns.join(', ')}</p>
                          )}
                          {item.notes && ( // Show notes if provided
                            <p className="text-xs text-gray-500">Notes: {item.notes}</p>
                          )}
                          <div className="flex items-center mt-2"> {/* Quantity controls and remove button */}
                            <button
                              onClick={() => updateQuantity(item.name, item.quantity - 1, item.notes, item.addOns)} // Decrease quantity
                              className="bg-gray-200 px-2 py-1 rounded-l-md" // Styled minus button
                            >
                              -
                            </button>
                            <span className="bg-gray-100 px-4 py-1">{item.quantity}</span> {/* Display current quantity */}
                            <button
                              onClick={() => updateQuantity(item.name, item.quantity + 1, item.notes, item.addOns)} // Increase quantity
                              className="bg-gray-200 px-2 py-1 rounded-r-md" // Styled plus button
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.name, item.notes, item.addOns)} // Remove item from cart
                              className="ml-4 text-red-500 hover:text-red-700" // Styled remove button
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Subtotal and checkout */}
                <div className="mt-6"> {/* Footer section */}
                  <div className="flex justify-between text-lg font-medium text-gray-800"> {/* Subtotal display */}
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span> {/* Formatted subtotal */}
                  </div>
                  <button
                    onClick={handleCheckout} // Proceed to checkout
                    className="w-full mt-4 bg-ooty-gold text-white py-3 rounded-full font-semibold hover:bg-ooty-gold/90 transition-colors" // Styled checkout button
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart; // Export the component for use in other parts of the app