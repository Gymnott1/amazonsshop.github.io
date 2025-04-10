import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Load cart from localStorage on initialization
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Calculate total
    const newTotal = cart.reduce((sum, item) => sum + (item.salePrice * item.quantity), 0);
    setTotal(newTotal);
  }, [cart]);

  // Add item to cart
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      ));
    }
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      total, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      itemCount: cart.reduce((sum, item) => sum + item.quantity, 0)
    }}>
      {children}
    </CartContext.Provider>
  );
};