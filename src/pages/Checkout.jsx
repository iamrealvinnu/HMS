import React, { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext'; // Custom hook for cart management
import { FaCreditCard, FaQrcode, FaMoneyBill } from 'react-icons/fa'; // Icons for payment methods
import { useNavigate, useLocation } from 'react-router-dom'; // Hooks for navigation and location data

// Checkout component to handle payment and order confirmation
const Checkout = () => {
  const { cart, clearCart } = useCart(); // Access cart items and clear function
  const navigate = useNavigate(); // For programmatic navigation
  const location = useLocation(); // Get data passed via navigation
  const { orderType, customerDetails } = location.state || {}; // Extract order type and customer info from state

  // State for managing payment method and form inputs
  const [paymentMethod, setPaymentMethod] = useState('card'); // Default payment method
  const [isProcessing, setIsProcessing] = useState(false); // Track payment processing status
  const [cardNumber, setCardNumber] = useState(''); // Card number input
  const [cardExpiry, setCardExpiry] = useState(''); // Card expiry input
  const [cardCvv, setCardCvv] = useState(''); // Card CVV input
  const [cardType, setCardType] = useState(''); // Detected card type (e.g., Visa)
  const [upiId, setUpiId] = useState(''); // UPI ID input
  const [showPopup, setShowPopup] = useState(false); // Toggle success popup
  const [popupMessage, setPopupMessage] = useState(''); // Popup message content
  const [errors, setErrors] = useState({ // Validation error messages
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: ''
  });
  const [coupon, setCoupon] = useState(''); // Coupon code input
  const [appliedCoupon, setAppliedCoupon] = useState(null); // Applied coupon details
  const [discount, setDiscount] = useState(0); // Discount amount

  // Available coupons with their rules
  const coupons = {
    OOTY20: { type: 'percentage', value: 20, description: '20% OFF on OOTY Order' },
    FREEDEL: { type: 'delivery', value: 40, description: 'Free Delivery (₹40 OFF)' },
    TASTY10: { type: 'percentage', value: 10, minOrder: 300, description: '10% OFF on Order Above ₹300' }
  };

  // Popup component for order confirmation
  const CustomPopup = ({ message }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in"> {/* Overlay with animation */}
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" /> {/* Semi-transparent background */}
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl transform transition-all relative z-10"> {/* Popup content */}
        <div className="text-center">
          <div className="text-xl font-medium mb-4">{message}</div> {/* Popup message */}
          <div className="mt-2">
            <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden"> {/* Progress bar container */}
              <div className="bg-ooty-gold h-full animate-progress-bar" /> {/* Animated progress bar */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Detect card type based on card number
  const detectCardType = (number) => {
    const cleaned = number.replace(/\D/g, ''); // Remove non-digits
    if (cleaned.startsWith('4')) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    if (/^6(?:011|5)/.test(cleaned)) return 'discover';
    if (/^(60|65|81|82|508)/.test(cleaned)) return 'rupay';
    return ''; // No match found
  };

  // Update card type whenever card number changes
  useEffect(() => {
    setCardType(detectCardType(cardNumber));
  }, [cardNumber]);

  // Format card number with spaces (e.g., "1234 5678 9012 3456")
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, ''); // Remove non-digits
    let formatted = '';
    for (let i = 0; i < cleaned.length; i += 4) {
      if (i > 0) formatted += ' '; // Add space every 4 digits
      formatted += cleaned.slice(i, i + 4);
    }
    return formatted;
  };

  // Calculate subtotal, tax, and delivery fee
  const subtotal = cart.reduce((sum, item) => {
    const basePrice = item.price; // Base price already includes add-ons from Menu
    const addOnsPrice = item.addOns.reduce((addSum, addOn) => {
      const priceMatch = addOn.match(/₹(\d+)/); // Extract add-on price
      return priceMatch ? addSum + parseFloat(priceMatch[1]) : addSum;
    }, 0);
    return sum + (basePrice + addOnsPrice) * item.quantity; // Total per item
  }, 0);
  const tax = subtotal * 0.05; // 5% GST
  const deliveryFee = orderType === 'delivery' && subtotal > 0 ? 40 : 0; // ₹40 for delivery orders

  // Apply coupon code and calculate discount
  const applyCoupon = () => {
    const couponData = coupons[coupon.toUpperCase()];
    if (!couponData) {
      alert('Invalid coupon code');
      return;
    }

    let newDiscount = 0;
    if (couponData.type === 'percentage') {
      if (couponData.minOrder && subtotal < couponData.minOrder) {
        alert(`This coupon requires a minimum order of ₹${couponData.minOrder}`);
        return;
      }
      newDiscount = (subtotal * couponData.value) / 100; // Percentage discount
    } else if (couponData.type === 'delivery') {
      if (orderType !== 'delivery') {
        alert('This coupon is only applicable for delivery orders');
        return;
      }
      newDiscount = deliveryFee; // Free delivery discount
    }

    setAppliedCoupon(couponData);
    setDiscount(newDiscount);
  };

  // Calculate final total with tax, delivery, and discount
  const total = subtotal + tax + (deliveryFee - (appliedCoupon?.type === 'delivery' ? deliveryFee : 0)) - discount;

  // Get current date and time for receipt
  const today = new Date();
  const dateString = today.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeString = today.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  // Validation functions for payment inputs
  const validateCardNumber = (number) => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length < 16) return 'Card number must be 16 digits';
    return '';
  };

  const validateExpiry = (expiry) => {
    if (!expiry) return '';
    const [month, year] = expiry.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (!month || !year) return 'Invalid format (MM/YY)';
    if (parseInt(month) > 12 || parseInt(month) < 1) return 'Invalid month';
    if (parseInt(year) < currentYear) return 'Card has expired';
    if (parseInt(year) === currentYear && parseInt(month) < currentMonth) return 'Card has expired';
    return '';
  };

  const validateCvv = (cvv) => {
    if (cvv.length < 3) return 'CVV must be 3 digits';
    return '';
  };

  const validateUpiId = (upi) => {
    if (!upi.includes('@')) return 'Invalid UPI ID format';
    return '';
  };

  // Handle input changes with validation
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCardNumber(value);
    setErrors(prev => ({ ...prev, cardNumber: validateCardNumber(value) }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2); // Add slash after MM
    setCardExpiry(value);
    setErrors(prev => ({ ...prev, cardExpiry: validateExpiry(value) }));
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCardCvv(value);
    setErrors(prev => ({ ...prev, cardCvv: validateCvv(value) }));
  };

  const handleUpiChange = (e) => {
    const value = e.target.value;
    setUpiId(value);
    setErrors(prev => ({ ...prev, upiId: validateUpiId(value) }));
  };

  // Handle order placement
  const handlePlaceOrder = () => {
    if (!orderType || !customerDetails) {
      alert('Please complete the order type selection first');
      navigate('/order-type');
      return;
    }

    if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCvv)) {
      alert('Please fill in all card details');
      return;
    }
    if (paymentMethod === 'upi' && !upiId) {
      alert('Please enter UPI ID');
      return;
    }

    // Simulate payment processing (placeholder for real gateway)
    const messages = [
      "🚀 Payment processing is under construction! Your order is confirmed and will be ready soon!",
      "👨‍💻 Our payment system is getting a spicy upgrade! Order confirmed!",
      "🌟 Payment gateway taking a break! Your food is on the way!"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setPopupMessage(randomMessage);
    setShowPopup(true);
    setIsProcessing(true);

    // Clear cart and redirect after 5 seconds
    setTimeout(() => {
      setShowPopup(false);
      clearCart();
      navigate('/');
    }, 5000);
  };

  // Add custom animations via CSS keyframes
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
      @keyframes progress-bar { 0% { width: 100%; } 100% { width: 0%; } }
      .animate-fade-in { animation: fade-in 0.5s ease-out; }
      .animate-progress-bar { animation: progress-bar 5s linear; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style); // Cleanup on unmount
  }, []);

  // Redirect to menu if cart is empty
  if (cart.length === 0) {
    navigate('/menu');
    return null;
  }

  // Format price with commas and ₹ symbol
  const formatPrice = (price) => `₹${price.toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Render the checkout UI
  return (
    <div className="min-h-screen bg-gray-50 py-8"> {/* Main container */}
      {showPopup && <CustomPopup message={popupMessage} />} {/* Show popup if active */}
      <div className="container mx-auto px-4"> {/* Centered content */}
        <div className="max-w-3xl mx-auto mt-20"> {/* Checkout card */}
          <div className="bg-white rounded-lg shadow-sm"> {/* Receipt-like container */}
            {/* Header */}
            <div className="text-center p-6 border-b border-dashed border-gray-200">
              <h2 className="text-2xl font-bold text-ooty-gold mb-1">FusionFood</h2> {/* Restaurant name */}
              <p className="text-gray-600">Ooty, Tamil Nadu</p> {/* Location */}
              <p className="text-gray-600 text-sm">Tel: +91 98765 43210</p> {/* Contact */}
              <div className="text-gray-500 text-xs mt-2"> {/* Date and time */}
                <p>{dateString}</p>
                <p>{timeString}</p>
              </div>
            </div>

            {/* Customer Information */}
            <div className="p-6 border-b border-dashed border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-500">CUSTOMER INFORMATION</h3>
                <button onClick={() => navigate('/order-type')} className="text-ooty-gold text-sm font-medium hover:underline">Edit</button> {/* Edit button */}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm"> {/* Customer details grid */}
                <div><p className="text-gray-600 font-medium">Order Type</p><p className="text-gray-800 capitalize">{orderType || 'N/A'}</p></div>
                <div><p className="text-gray-600 font-medium">Full Name</p><p className="text-gray-800">{customerDetails?.fullName || 'N/A'}</p></div>
                <div><p className="text-gray-600 font-medium">Phone Number</p><p className="text-gray-800">{customerDetails?.phoneNumber || 'N/A'}</p></div>
                <div><p className="text-gray-600 font-medium">Email</p><p className="text-gray-800">{customerDetails?.email || 'N/A'}</p></div>
                {orderType === 'delivery' && ( // Show address for delivery orders
                  <div className="col-span-2">
                    <p className="text-gray-600 font-medium">Delivery Address</p>
                    <p className="text-gray-800">
                      {customerDetails?.flatNo && `${customerDetails.flatNo}, `}
                      {customerDetails?.streetAddress}
                      {customerDetails?.landmark && `, Landmark: ${customerDetails.landmark}`}
                      {!customerDetails?.flatNo && !customerDetails?.streetAddress && !customerDetails?.landmark && 'N/A'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Details */}
            <div className="p-6 border-b border-dashed border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-4">ORDER DETAILS</h3>
              <div className="space-y-4"> {/* List of cart items */}
                {cart.map((item) => {
                  const itemPrice = item.price; // Base price includes add-ons from Menu
                  const addOnsPrice = item.addOns.reduce((sum, addOn) => {
                    const priceMatch = addOn.match(/₹(\d+)/);
                    return priceMatch ? sum + parseFloat(priceMatch[1]) : sum;
                  }, 0);
                  const itemTotal = (itemPrice + addOnsPrice) * item.quantity;
                  return (
                    <div key={item.name} className="flex items-start"> {/* Individual item */}
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" /> {/* Item image */}
                      <div className="flex-1 ml-4">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800">{item.name}</h4> {/* Item name */}
                            <p className="text-sm text-gray-500">₹{(itemPrice + addOnsPrice).toFixed(2)} × {item.quantity}</p> {/* Price breakdown */}
                            {item.addOns.length > 0 && <p className="text-xs text-gray-500">Add-ons: {item.addOns.join(', ')}</p>} {/* Add-ons */}
                            {item.personalization && <p className="text-xs text-gray-500">Notes: {item.personalization}</p>} {/* Notes */}
                          </div>
                          <p className="font-medium text-gray-800">{formatPrice(itemTotal)}</p> {/* Item total */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bill Details */}
            <div className="p-6 border-b border-dashed border-gray-200 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-500 mb-4">BILL DETAILS</h3>
              <div className="space-y-3"> {/* Breakdown of costs */}
                <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span className="text-gray-800">{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">GST (5%)</span><span className="text-gray-800">{formatPrice(tax)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Delivery Fee</span><span className="text-gray-800">{formatPrice(deliveryFee)}</span></div>
                {appliedCoupon && ( // Show discount if coupon applied
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({coupon.toUpperCase()})</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-gray-200 font-medium"> {/* Final total */}
                  <span className="text-gray-800">Total</span>
                  <span className="text-gray-800">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="p-6 border-b border-dashed border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-4">APPLY COUPON</h3>
              <div className="flex space-x-2 mb-4"> {/* Coupon input and button */}
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-ooty-gold focus:border-ooty-gold border-gray-300" // Styled input
                />
                <button onClick={applyCoupon} className="bg-ooty-gold text-white px-4 py-2 rounded-lg hover:bg-ooty-gold/90 transition-colors">Apply</button> {/* Apply button */}
              </div>
              <div className="grid grid-cols-3 gap-2"> {/* Coupon options */}
                {Object.entries(coupons).map(([code, details]) => (
                  <button
                    key={code}
                    onClick={() => setCoupon(code)} // Set coupon code on click
                    className={`p-2 rounded-lg border text-sm ${coupon === code ? 'border-ooty-gold bg-ooty-gold/10' : 'border-gray-200'} transition-colors`} // Highlight selected
                  >
                    <p className="font-medium">{code}</p>
                    <p className="text-xs text-gray-600">{details.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="p-6 border-b border-dashed border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-4">PAYMENT METHOD</h3>
              <div className="grid grid-cols-3 gap-4 mb-6"> {/* Payment options */}
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-lg border ${paymentMethod === 'card' ? 'border-ooty-gold bg-ooty-gold/5 text-ooty-gold' : 'border-gray-200 text-gray-500'} transition-colors`} // Card option
                >
                  <FaCreditCard className="mx-auto text-xl mb-2" />
                  <p className="text-sm">Card</p>
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-lg border ${paymentMethod === 'upi' ? 'border-ooty-gold bg-ooty-gold/5 text-ooty-gold' : 'border-gray-200 text-gray-500'} transition-colors`} // UPI option
                >
                  <FaQrcode className="mx-auto text-xl mb-2" />
                  <p className="text-sm">UPI</p>
                </button>
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-lg border ${paymentMethod === 'cash' ? 'border-ooty-gold bg-ooty-gold/5 text-ooty-gold' : 'border-gray-200 text-gray-500'} transition-colors`} // Cash option
                >
                  <FaMoneyBill className="mx-auto text-xl mb-2" />
                  <p className="text-sm">Cash</p>
                </button>
              </div>

              {/* Payment Details */}
              <div className="mt-6">
                {paymentMethod === 'card' && ( // Card payment form
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg mb-4"> {/* Supported cards */}
                      <p className="text-sm text-gray-600 mb-3">Supported Cards:</p>
                      <div className="flex gap-6 items-center justify-center flex-wrap">
                        <img src="/images/visa.png" alt="Visa" className={`h-10 ${cardType === 'visa' ? 'opacity-100 brightness-110' : 'opacity-85'} transition-all hover:opacity-100 hover:brightness-110 hover:scale-105`} />
                        <img src="/images/mastercard.webp" alt="Mastercard" className={`h-10 ${cardType === 'mastercard' ? 'opacity-100 brightness-110' : 'opacity-85'} transition-all hover:opacity-100 hover:brightness-110 hover:scale-105`} />
                        <img src="/images/rupay.png" alt="RuPay" className={`h-10 ${cardType === 'rupay' ? 'opacity-100 brightness-110' : 'opacity-85'} transition-all hover:opacity-100 hover:brightness-110 hover:scale-105`} />
                        <img src="/images/amex.jpg" alt="American Express" className={`h-10 ${cardType === 'amex' ? 'opacity-100 brightness-110' : 'opacity-85'} transition-all hover:opacity-100 hover:brightness-110 hover:scale-105`} />
                        <img src="/images/discover.png" alt="Discover" className={`h-10 ${cardType === 'discover' ? 'opacity-100 brightness-110' : 'opacity-85'} transition-all hover:opacity-100 hover:brightness-110 hover:scale-105`} />
                      </div>
                    </div>
                    <div> {/* Card number input */}
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          maxLength="19"
                          placeholder="1234 5678 9012 3456"
                          className={`w-full px-4 py-2 h-12 border rounded-lg focus:ring-ooty-gold focus:border-ooty-gold pr-16 ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                          value={formatCardNumber(cardNumber)}
                          onChange={handleCardNumberChange}
                        />
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>} {/* Error message */}
                        {cardType && ( // Show card logo if detected
                          <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <img src={`/images/${cardType}.${cardType === 'mastercard' ? 'webp' : cardType === 'amex' ? 'jpg' : 'png'}`} alt={cardType} className="h-8 w-auto object-contain" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4"> {/* Expiry and CVV */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength="5"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-ooty-gold focus:border-ooty-gold ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'}`}
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                        />
                        {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="password"
                          maxLength="3"
                          placeholder="123"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-ooty-gold focus:border-ooty-gold ${errors.cardCvv ? 'border-red-500' : 'border-gray-300'}`}
                          value={cardCvv}
                          onChange={handleCvvChange}
                        />
                        {errors.cardCvv && <p className="text-red-500 text-xs mt-1">{errors.cardCvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && ( // UPI payment form
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                      <input
                        type="text"
                        placeholder="username@upi"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-ooty-gold focus:border-ooty-gold ${errors.upiId ? 'border-red-500' : 'border-gray-300'}`}
                        value={upiId}
                        onChange={handleUpiChange}
                      />
                      {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg"> {/* Supported UPI apps */}
                      <p className="text-sm text-gray-600">Supported UPI Apps:</p>
                      <div className="mt-2 flex gap-4">
                        <img src='/images/gpaylogo.jpg' alt="Google Pay" className="h-8" />
                        <img src='/images/phonepelogo.png' alt="PhonePe" className="h-8" />
                        <img src='/images/paytmlogo.png' alt="Paytm" className="h-8" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cash' && ( // Cash payment info
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Pay with cash upon {orderType}</p>
                    <p className="text-xs text-gray-500 mt-2">Please keep exact change ready: {formatPrice(total)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 text-center text-gray-500 text-xs border-b border-dashed border-gray-200">
              <p>Thank you for choosing FusionFood!</p>
              <p>Visit us again</p>
              <p className="mt-2">-- Order #{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')} --</p> {/* Random order number */}
            </div>

            {/* Place Order Button */}
            <div className="p-6">
              <button
                className="w-full bg-ooty-gold text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-ooty-gold/90 transition-colors disabled:opacity-50" // Styled button
                onClick={handlePlaceOrder}
                disabled={isProcessing} // Disable during processing
              >
                {isProcessing ? 'Processing...' : `Place Order • ${formatPrice(total)}`} {/* Button text */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; // Export the component for use in the app