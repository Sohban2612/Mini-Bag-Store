import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Product not found');
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await addToCart(product._id, 1);
      alert('Product added to cart!');
    } catch (error) {
      alert('Failed to add product to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <div className="error">{error || 'Product not found'}</div>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="product-details">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Shop
      </button>
      <div className="product-details-container">
        <div className="product-image-large">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-details-info">
          <div className="product-category-badge">{product.category}</div>
          <h1 className="product-title">{product.name}</h1>
          {product.rating && (
            <div className="product-rating-section">
              <div className="rating-stars">
                {'⭐'.repeat(Math.floor(product.rating.rate))}
              </div>
              <span className="rating-value">{product.rating.rate}</span>
              <span className="rating-count">({product.rating.count} reviews)</span>
            </div>
          )}
          <div className="product-price-section">
            <span className="product-price-large">${product.price.toFixed(2)}</span>
            <span className="price-label">Including all taxes</span>
          </div>
          <div className="product-description-section">
            <h3>Description</h3>
            <p className="product-description">{product.description}</p>
          </div>
          <div className="product-features">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Free Shipping</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>30-Day Returns</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Secure Payment</span>
            </div>
          </div>
          <div className="product-actions">
            <button
              onClick={handleAddToCart}
              disabled={addingToCart || !product.inStock}
              className="btn btn-primary btn-large"
            >
              {addingToCart ? (
                <>
                  <span className="spinner"></span>
                  Adding...
                </>
              ) : (
                <>
                  <span>🛒</span>
                  Add to Cart
                </>
              )}
            </button>
            {!product.inStock && (
              <p className="out-of-stock">Out of Stock</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

