import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderType = () => {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!orderType) newErrors.orderType = 'Please select an order type';
    if (!fullName) newErrors.fullName = 'Full name is required';
    if (!phoneNumber || phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      newErrors.phoneNumber = 'Enter a valid 10-digit phone number';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (orderType === 'delivery') {
      if (!flatNo) newErrors.flatNo = 'Flat/House No. is required';
      if (!streetAddress) newErrors.streetAddress = 'Street address is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const customerDetails = {
        fullName,
        phoneNumber,
        email,
        ...(orderType === 'delivery' && { flatNo, streetAddress, landmark }),
      };
      navigate('/checkout', { state: { orderType, customerDetails } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Choose Your Order Type</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`flex-1 py-3 rounded-full font-semibold shadow-md transition-colors ${orderType === 'delivery' ? 'bg-ooty-gold text-white' : 'bg-gray-100 text-gray-600 hover:bg-ooty-gold/20'}`}
              >
                Delivery
              </button>
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`flex-1 py-3 rounded-full font-semibold shadow-md transition-colors ${orderType === 'pickup' ? 'bg-ooty-gold text-white' : 'bg-gray-100 text-gray-600 hover:bg-ooty-gold/20'}`}
              >
                Pick-up
              </button>
            </div>
            {errors.orderType && <p className="text-red-500 text-xs mt-1">{errors.orderType}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-ooty-gold focus:border-ooty-gold ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
              maxLength="10"
              className={`mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-ooty-gold focus:border-ooty-gold ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-ooty-gold focus:border-ooty-gold ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {orderType === 'delivery' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Flat/House No.</label>
                <input
                  type="text"
                  value={flatNo}
                  onChange={(e) => setFlatNo(e.target.value)}
                  className={`mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-ooty-gold focus:border-ooty-gold ${errors.flatNo ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.flatNo && <p className="text-red-500 text-xs mt-1">{errors.flatNo}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Street Address</label>
                <input
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className={`mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-ooty-gold focus:border-ooty-gold ${errors.streetAddress ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Landmark (Optional)</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-ooty-gold focus:border-ooty-gold border-gray-300"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-ooty-gold text-white py-3 rounded-full font-semibold hover:bg-ooty-gold/90 transition-colors shadow-md"
          >
            Continue to Checkout
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default OrderType;