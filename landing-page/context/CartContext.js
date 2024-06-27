// context/CartContext.js
import { createContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    console.log(item)
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.item_id === item.item_id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.item_id === item.item_id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter(item => item.item_id !== itemId));
  };

  const updateCartItem = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.item_id === id
          ? { ...item, quantity: Math.max(0, quantity) } // Prevent negative quantities
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
