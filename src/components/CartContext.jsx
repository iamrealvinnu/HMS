import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    setCart(prevCart => {
      const newItem = {
        ...item,
        addOns: item.addOns || [],
        personalization: item.notes || '',
        price: parseFloat(item.price.replace('₹', '')),
      };

      const existingItem = prevCart.find(cartItem =>
        cartItem.name === newItem.name &&
        cartItem.personalization === newItem.personalization &&
        JSON.stringify(cartItem.addOns) === JSON.stringify(newItem.addOns)
      );

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.name === newItem.name &&
          cartItem.personalization === newItem.personalization &&
          JSON.stringify(cartItem.addOns) === JSON.stringify(newItem.addOns)
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prevCart, { ...newItem, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemName, personalization, addOns) => {
    setCart(prevCart => prevCart.filter(item =>
      !(item.name === itemName &&
        item.personalization === personalization &&
        JSON.stringify(item.addOns) === JSON.stringify(addOns))
    ));
  };

  const updateQuantity = (itemName, newQuantity, personalization, addOns) => {
    if (newQuantity < 1) {
      removeFromCart(itemName, personalization, addOns);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.name === itemName &&
        item.personalization === personalization &&
        JSON.stringify(item.addOns) === JSON.stringify(addOns)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const basePrice = item.price || 0;
      const addOnsPrice = (item.addOns || []).reduce((sum, addOn) => {
        const priceMatch = addOn.match(/₹(\d+)/);
        return priceMatch ? sum + parseFloat(priceMatch[1]) : sum;
      }, 0);
      return total + (basePrice + addOnsPrice) * item.quantity;
    }, 0);
  };

  const clearCart = () => {
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);