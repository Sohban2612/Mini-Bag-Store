import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="order-success">
      <div className="success-container">
        <div className="success-icon-wrapper">
          <svg className={`success-checkmark ${animate ? 'animate' : ''}`} viewBox="0 0 52 52">
            <circle 
              className="success-checkmark-circle" 
              cx="26" 
              cy="26" 
              r="25" 
              fill="none"
            />
            <path 
              className="success-checkmark-check" 
              fill="none" 
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <h1 className="success-title">Order Placed Successfully!</h1>
        <p className="success-description">
          Thank you for your purchase. Your order has been confirmed and will be processed shortly.
        </p>
        <p className="success-message">
          You will receive an email confirmation with your order details.
        </p>
        <div className="success-actions">
          <Link to="/" className="btn btn-primary btn-large">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

