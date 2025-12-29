import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
    } catch (error) {
      alert('Failed to remove item from cart');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart cart-empty-wrapper">
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart!</p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1 className="page-title">Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => {
            const product = item.productId;
            if (!product) return null;

            return (
              <div key={item._id || product._id} className="cart-item">
                <div className="cart-item-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{product.name}</h3>
                  <p className="cart-item-price">${product.price.toFixed(2)}</p>
                  <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                </div>
                <div className="cart-item-total">
                  <p className="item-total-price">
                    ${(product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemove(product._id)}
                    className="btn btn-remove"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="btn btn-primary btn-large"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

