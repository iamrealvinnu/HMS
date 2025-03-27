import React, { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext';
import { FaCreditCard, FaWallet, FaMoneyBill, FaQrcode } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardType, setCardType] = useState('');
  const [upiId, setUpiId] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [errors, setErrors] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: ''
  });
  
  const [orderType, setOrderType] = useState(''); // Changed to empty initial state
  const [customerDetails, setCustomerDetails] = useState({
    fullName: '',
    phoneNumber: '',
    flatNo: '',
    streetAddress: '',
    landmark: ''
  });
  const [customerErrors, setCustomerErrors] = useState({
    fullName: '',
    phoneNumber: '',
    flatNo: '',
    streetAddress: '',
    landmark: ''
  });

  // Function for custom popup
  const CustomPopup = ({ message }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in">
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" />
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl transform transition-all relative z-10">
        <div className="text-center">
          <div className="text-xl font-medium mb-4">{message}</div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
              <div className="bg-ooty-gold h-full animate-progress-bar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Function to detect card type
  const detectCardType = (number) => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.startsWith('4')) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    if (/^6(?:011|5)/.test(cleaned)) return 'discover';
    if (/^(60|65|81|82|508)/.test(cleaned)) return 'rupay';
    return '';
  };

  // Update card type when number changes
  useEffect(() => {
    setCardType(detectCardType(cardNumber));
  }, [cardNumber]);

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < cleaned.length; i += 4) {
      if (i > 0) formatted += ' ';
      formatted += cleaned.slice(i, i + 4);
    }
    return formatted;
  };

  // Calculate totals with proper number parsing
  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
    return sum + (price * item.quantity);
  }, 0);
  const tax = subtotal * 0.05;
  const deliveryFee = orderType === 'delivery' && subtotal > 0 ? 40 : 0;
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

  // Validate card number format
  const validateCardNumber = (number) => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length < 16) {
      return 'Card number must be 16 digits';
    }
    return '';
  };

  // Validate expiry date
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

  // Validate CVV
  const validateCvv = (cvv) => {
    if (cvv.length < 3) return 'CVV must be 3 digits';
    return '';
  };

  // Validate UPI ID
  const validateUpiId = (upi) => {
    if (!upi.includes('@')) return 'Invalid UPI ID format';
    return '';
  };

  // Validation functions for customer details
  const validateFullName = (name) => {
    if (!name.trim()) return 'Full name is required';
    return '';
  };

  const validatePhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 10) return 'Phone number must be 10 digits';
    return '';
  };

  const validateAddressField = (field, fieldName) => {
    if (!field.trim()) return `${fieldName} is required`;
    return '';
  };

  // Update card number with validation
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCardNumber(value);
    setErrors(prev => ({
      ...prev,
      cardNumber: validateCardNumber(value)
    }));
  };

  // Update expiry with validation
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setCardExpiry(value);
    setErrors(prev => ({
      ...prev,
      cardExpiry: validateExpiry(value)
    }));
  };

  // Update CVV with validation
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCardCvv(value);
    setErrors(prev => ({
      ...prev,
      cardCvv: validateCvv(value)
    }));
  };

  // Update UPI ID with validation
  const handleUpiChange = (e) => {
    const value = e.target.value;
    setUpiId(value);
    setErrors(prev => ({
      ...prev,
      upiId: validateUpiId(value)
    }));
  };

  // Handle customer details changes
  const handleCustomerDetailChange = (field) => (e) => {
    const value = e.target.value;
    setCustomerDetails(prev => ({
      ...prev,
      [field]: value
    }));

    let error = '';
    if (field === 'fullName') error = validateFullName(value);
    if (field === 'phoneNumber') error = validatePhoneNumber(value);
    if (orderType === 'delivery' && field === 'flatNo') error = validateAddressField(value, 'Flat number');
    if (orderType === 'delivery' && field === 'streetAddress') error = validateAddressField(value, 'Street address');
    if (orderType === 'delivery' && field === 'landmark') error = validateAddressField(value, 'Landmark');

    setCustomerErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const handlePlaceOrder = () => {
    if (!orderType) {
      alert('Please select an order type');
      return;
    }

    const nameError = validateFullName(customerDetails.fullName);
    const phoneError = validatePhoneNumber(customerDetails.phoneNumber);
    let deliveryErrors = {};

    if (orderType === 'delivery') {
      deliveryErrors = {
        flatNo: validateAddressField(customerDetails.flatNo, 'Flat number'),
        streetAddress: validateAddressField(customerDetails.streetAddress, 'Street address'),
        landmark: validateAddressField(customerDetails.landmark, 'Landmark')
      };
    }

    setCustomerErrors({
      fullName: nameError,
      phoneNumber: phoneError,
      ...deliveryErrors
    });

    if (nameError || phoneError || Object.values(deliveryErrors).some(error => error)) {
      alert('Please fill in all required customer details');
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
    
    const messages = [
      "🚀 Oops! Our payment ninjas are still training! But your food is just a few days away from being payment-ready! 🎉",
      "👨‍💻 Our chefs are cooking up the payment system! Your delicious order will be ready to process very soon! 🍳",
      "🌟 Payment system is taking a power nap! But like a perfect biryani, it's worth the wait! ✨",
      "🎨 We're adding the final spices to our payment system! Your foodie dreams will come true soon! 🌶️",
      "🎵 Our payment system is learning to dance! But your taste buds won't have to wait much longer! 💃"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setPopupMessage(randomMessage);
    setShowPopup(true);
    setIsProcessing(true);
    
    setTimeout(() => {
      setShowPopup(false);
      clearCart();
      navigate('/');
    }, 10000);
  };

  // Add styles for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fade-in {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      @keyframes progress-bar {
        0% { width: 100%; }
        100% { width: 0%; }
      }
      .animate-fade-in {
        animation: fade-in 0.5s ease-out;
      }
      .animate-progress-bar {
        animation: progress-bar 10s linear;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (cart.length === 0) {
    navigate('/menu');
    return null;
  }

  // Format currency
  const formatPrice = (price) => {
    return `₹${price.toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {showPopup && <CustomPopup message={popupMessage} />}
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mt-20">
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
                {cart.map((item) => {
                  const itemPrice = parseFloat(item.price.replace('₹', '').replace(',', ''));
                  const itemTotal = itemPrice * item.quantity;
                  return (
                    <div key={item.name} className="flex items-start">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1 ml-4">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-500">{item.price} × {item.quantity}</p>
                          </div>
                          <p className="font-medium text-gray-800">{formatPrice(itemTotal)}</p>
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
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Item Total</span>
                  <span className="text-gray-800">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="text-gray-800">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-800">{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200 font-medium">
                  <span className="text-gray-800">To Pay</span>
                  <span className="text-gray-800">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Order Type Selection */}
            <div className="p-6 border-b border-dashed border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-4">ORDER TYPE</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setOrderType('delivery')}
                  className={`p-4 rounded-lg border ${
                    orderType === 'delivery' 
                      ? 'border-ooty-gold bg-ooty-gold/5 text-ooty-gold' 
                      : 'border-gray-200 text-gray-500'
                  } transition-colors`}
                >
                  <p className="text-sm">Delivery</p>
                </button>
                <button
                  onClick={() => setOrderType('pickup')}
                  className={`p-4 rounded-lg border ${
                    orderType === 'pickup' 
                      ? 'border-ooty-gold bg-ooty-gold/5 text-ooty-gold' 
                      : 'border-gray-200 text-gray-500'
                  } transition-colors`}
                >
                  <p className="text-sm">Pick-up</p>
                </button>
              </div>

              {/* Customer Details - Shown only after order type selection */}
              {orderType && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-ooty-gold focus:border-ooty-gold ${
                        customerErrors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={customerDetails.fullName}
                      onChange={handleCustomerDetailChange('fullName')}
                    />
                    {customerErrors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{customerErrors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      maxLength="10"
                      placeholder="9876543210"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-ooty-gold focus:border-ooty-gold ${
                        customerErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={customerDetails.phoneNumber}
                      onChange={handleCustomerDetailChange('phoneNumber')}
                    />
                    {customerErrors.phoneNumber && (
                      <p className="text-red-500 text-xs mt-1">{customerErrors.phoneNumber}</p>
                    )}
                  </div>
                  {orderType === 'delivery' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Flat Number</label>
                        <input
                          type="text"
                          placeholder="Flat 101"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-ooty-gold focus:border-ooty-gold ${
                            customerErrors.flatNo ? 'border-red-500' : 'border-gray-300'
                          }`}
                          value={customerDetails.flatNo}
                          onChange={handleCustomerDetailChange('flatNo')}
                        />
                        {customerErrors.flatNo && (
                          <p className="text-red-500 text-xs mt-1">{customerErrors.flatNo}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                        <input
                          type="text"
                          placeholder="123 Main Street"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-ooty-gold focus:border-ooty-gold ${
                            customerErrors.streetAddress ? 'border-red-500' : 'border-gray-300'
                          }`}
                          value={customerDetails.streetAddress}
                          onChange={handleCustomerDetailChange('streetAddress')}
                        />
                        {customerErrors.streetAddress && (
                          <p className="text-red-500 text-xs mt-1">{customerErrors.streetAddress}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
                        <input
                          type="text"
                          placeholder="Near City Park"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-ooty-gold focus:border-ooty-gold ${
                            customerErrors.landmark ? 'border-red-500' : 'border-gray-300'
                          }`}
                          value={customerDetails.landmark}
                          onChange={handleCustomerDetailChange('landmark')}
                        />
                        {customerErrors.landmark && (
                          <p className="text-red-500 text-xs mt-1">{customerErrors.landmark}</p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="p-6 border-b border-dashed border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-4">PAYMENT METHOD</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-lg border ${
                    paymentMethod === 'card' 
                      ? 'border-ooty-gold bg-ooty-gold/5 text-ooty-gold' 
                      : 'border-gray-200 text-gray-500'
                  } transition-colors`}
                >
                  <FaCreditCard className="mx-auto text-xl mb-2" />
                  <p className="text-sm">Card</p>
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-lg border ${
                    paymentMethod === 'upi' 
                      ? 'border-ooty-gold bg-ooty-gold/5 text-ooty-gold' 
                      : 'border-gray-200 text-gray-500'
                  } transition-colors`}
                >
                  <FaQrcode className="mx-auto text-xl mb-2" />
                  <p className="text-sm">UPI</p>
                </button>
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-lg border ${
                    paymentMethod === 'cash' 
                      ? 'border-ooty-gold bg-ooty-gold/5 text-ooty-gold' 
                      : 'border-gray-200 text-gray-500'
                  } transition-colors`}
                >
                  <FaMoneyBill className="mx-auto text-xl mb-2" />
                  <p className="text-sm">Cash</p>
                </button>
              </div>

              {/* Payment Details */}
              <div className="mt-6">
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <p className="text-sm text-gray-600 mb-3">Supported Cards:</p>
                      <div className="flex gap-6 items-center justify-center flex-wrap">
                        <img src="/images/visa.png" alt="Visa" className={`h-10 ${cardType === 'visa' ? 'opacity-100 brightness-110' : 'opacity-85'} transition-all hover:opacity-100 hover:brightness-110 hover:scale-105`} />
                        <img src="/images/mastercard.webp" alt="Mastercard" className={`h-10 ${cardType === 'mastercard' ? 'opacity-100 brightness-110' : 'opacity-85'} transition-all hover:opacity-100 hover:brightness-110 hover:scale-105`} />
                        <img src="/images/rupay.png" alt="RuPay" className={`h-10 ${cardType === 'rupay' ? 'opacity-100 brightness-110' : 'opacity-85'} transition-all hover:opacity-100 hover:brightness-110 hover:scale-105`} />
                        <img src="/images/amex.jpg" alt="American Express" className={`h-10 ${cardType === 'amex' ? 'opacity-100 brightness-110' : 'opacity-85'} transition-all hover:opacity-100 hover:brightness-110 hover:scale-105`} />
                        <img src="/images/discover.png" alt="Discover" className={`h-10 ${cardType === 'discover' ? 'opacity-100 brightness-110' : 'opacity-85'} transition-all hover:opacity-100 hover:brightness-110 hover:scale-105`} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          maxLength="19"
                          placeholder="1234 5678 9012 3456"
                          className={`w-full px-4 py-2 h-12 leading-[3rem] border rounded-lg focus:ring-ooty-gold focus:border-ooty-gold pr-16 ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                          value={formatCardNumber(cardNumber)}
                          onChange={handleCardNumberChange}
                        />
                        {errors.cardNumber && (
                          <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                        )}
                        {cardType && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center transition-all duration-200 ease-in-out">
                            <img 
                              src={`/images/${cardType}.${cardType === 'mastercard' ? 'webp' : cardType === 'amex' ? 'jpg' : 'png'}`} 
                              alt={cardType} 
                              className="h-8 w-auto object-contain"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength="5"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-ooty-gold focus:border-ooty-gold ${
                            errors.cardExpiry ? 'border-red-500' : 'border-gray-300'
                          }`}
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                        />
                        {errors.cardExpiry && (
                          <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="password"
                          maxLength="3"
                          placeholder="123"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-ooty-gold focus:border-ooty-gold ${
                            errors.cardCvv ? 'border-red-500' : 'border-gray-300'
                          }`}
                          value={cardCvv}
                          onChange={handleCvvChange}
                        />
                        {errors.cardCvv && (
                          <p className="text-red-500 text-xs mt-1">{errors.cardCvv}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                      <input
                        type="text"
                        placeholder="username@upi"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-ooty-gold focus:border-ooty-gold ${
                          errors.upiId ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={upiId}
                        onChange={handleUpiChange}
                      />
                      {errors.upiId && (
                        <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>
                      )}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Supported UPI Apps:</p>
                      <div className="mt-2 flex gap-4">
                        <img src='/images/gpaylogo.jpg' alt="Google Pay" className="h-8" />
                        <img src='/images/phonepelogo.png' alt="PhonePe" className="h-8" />
                        <img src='/images/paytmlogo.png' alt="Paytm" className="h-8" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cash' && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Pay with cash upon {orderType}</p>
                    <p className="text-xs text-gray-500 mt-2">Please keep exact change ready: {formatPrice(total)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Receipt Footer */}
            <div className="p-6 text-center text-gray-500 text-xs border-b border-dashed border-gray-200">
              <p>Thank you for choosing FusionFood!</p>
              <p>Visit us again</p>
              <p className="mt-2">-- Order #{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')} --</p>
            </div>

            {/* Place Order Button */}
            <div className="p-6">
              <button 
                className="w-full bg-ooty-gold text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-ooty-gold/90 transition-colors disabled:opacity-50"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Place Order • ${formatPrice(total)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;