import React from 'react';
import { FaPlus, FaMinus, FaReceipt } from 'react-icons/fa';
import { useCart } from '../components/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, setCart } = useCart();

  const handleQuantityChange = (itemId, change) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.id === itemId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean);
      return updatedCart;
    });
  };

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05; // 5% tax
  const deliveryFee = subtotal > 0 ? 40 : 0; // ₹40 delivery fee if cart has items
  const total = subtotal + tax + deliveryFee;

  // Format date
  const today = new Date();
  const dateString = today.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeString = today.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
            <Link to="/menu" className="text-ooty-gold hover:text-ooty-gold/80">
              Continue Shopping
            </Link>
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <FaReceipt className="mx-auto text-gray-400 text-5xl mb-4" />
              <p className="text-xl text-gray-800 mb-2">Your cart is empty</p>
              <p className="text-gray-500 mb-6">Add some delicious items from our menu</p>
              <Link 
                to="/menu"
                className="inline-block bg-ooty-gold text-white px-6 py-3 rounded-lg font-medium hover:bg-ooty-gold/90 transition-colors"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm">
              {/* Receipt Header */}
              <div className="text-center p-6 border-b border-dashed border-gray-200">
                <h2 className="text-2xl font-bold text-ooty-gold mb-1">FusionFood</h2>
                <p className="text-gray-600">Ooty, Tamil Nadu</p>
                <p className="text-gray-600 text-sm">Tel: +91 98765 43210</p>
                <div className="text-gray-500 text-xs mt-2">
                  <p>{dateString}</p>
                  <p>{timeString}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 border-b border-dashed border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-4">ORDER DETAILS</h3>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1 ml-4">
                        <div className="flex justify-between mb-1">
                          <div>
                            <h4 className="font-medium text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} x {item.quantity}</p>
                          </div>
                          <p className="font-medium text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center mt-2">
                          <button 
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-ooty-gold border border-ooty-gold rounded-full hover:bg-ooty-gold hover:text-white transition-colors"
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="mx-4 font-medium text-gray-800">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-ooty-gold border border-ooty-gold rounded-full hover:bg-ooty-gold hover:text-white transition-colors"
                          >
                            <FaPlus size={12} />
                          </button>
                          <button 
                            onClick={() => handleQuantityChange(item.id, -item.quantity)}
                            className="ml-auto text-sm text-red-500 hover:text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bill Details */}
              <div className="p-6 border-b border-dashed border-gray-200 bg-gray-50">
                <h3 className="text-sm font-medium text-gray-500 mb-4">BILL DETAILS</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Item Total</span>
                    <span className="text-gray-800">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GST (5%)</span>
                    <span className="text-gray-800">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="text-gray-800">₹{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200 font-medium">
                    <span className="text-gray-800">Grand Total</span>
                    <span className="text-gray-800">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Receipt Footer */}
              <div className="p-6 text-center text-gray-500 text-xs border-b border-dashed border-gray-200">
                <p>Thank you for choosing FusionFood!</p>
                <p>Visit us again</p>
                <p className="mt-2">-- Order #{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')} --</p>
              </div>

              {/* Checkout Button */}
              <div className="p-6">
                <button 
                  className="w-full bg-ooty-gold text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-ooty-gold/90 transition-colors"
                  onClick={() => {
                    alert('Order placed successfully!');
                    setCart([]);
                  }}
                >
                  Proceed to Checkout • ₹{total.toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;