import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.email || !formData.address) {
      setError('Please fill in all fields');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/checkout', formData);
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Checkout error:', error);
      setError(error.response?.data?.error || 'Failed to process checkout');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <p>Add items to your cart before checkout</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h1 className="page-title">Checkout</h1>
      <div className="checkout-container">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2>Shipping Information</h2>
          
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Shipping Address *</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="4"
              placeholder="123 Main St, City, State, ZIP Code"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-large"
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cartItems.map((item) => {
              const product = item.productId;
              if (!product) return null;
              return (
                <div key={item._id || product._id} className="summary-item">
                  <span>{product.name} x {item.quantity}</span>
                  <span>${(product.price * item.quantity).toFixed(2)}</span>
                </div>
              );
            })}
          </div>
          <div className="summary-total">
            <span>Total:</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;



