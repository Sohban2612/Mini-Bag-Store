import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      const response = await axios.get('/api/cart');
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true);
    try {
      await axios.post('/api/cart', { productId, quantity });
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    setLoading(true);
    try {
      await axios.delete(`/api/cart/${productId}`);
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = item.productId;
      if (product && product.price) {
        return total + product.price * item.quantity;
      }
      return total;
    }, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalPrice,
    clearCart,
    loading
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};



