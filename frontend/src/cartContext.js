// CartContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a context
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// Provider to wrap the app and provide cart state globally
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // Function to add items to the cart
  const addToCart = (item) => {
    setCartCount(item); // Update cart items
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
