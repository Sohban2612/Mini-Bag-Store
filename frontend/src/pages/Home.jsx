import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from '../components/Carousel';
import Sidebar from '../components/Sidebar';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products');
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  let filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // Apply price filter
  if (priceRange.min) {
    filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(priceRange.min));
  }
  if (priceRange.max) {
    filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(priceRange.max));
  }

  // Featured products (top rated)
  const featuredProducts = [...products]
    .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
    .slice(0, 8);

  // Best deals (products with good ratings and reasonable prices)
  const bestDeals = [...products]
    .filter(p => p.rating?.rate >= 4)
    .sort((a, b) => a.price - b.price)
    .slice(0, 6);

  // New arrivals (first 6 products)
  const newArrivals = products.slice(0, 6);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setPriceRange({ min: '', max: '' });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading amazing products...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  const renderProductCard = (product, showBadge = false, badgeText = '') => (
    <div key={product._id} className="product-card">
      {showBadge && badgeText && (
        <div className="product-badge">{badgeText}</div>
      )}
      <Link to={`/product/${product._id}`}>
        <div className="product-image-wrapper">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-overlay">
            <span className="view-details">View Details</span>
          </div>
          {product.rating && (
            <div className="product-rating">
              <span>⭐</span>
              <span>{product.rating.rate}</span>
            </div>
          )}
        </div>
        <div className="product-info">
          <p className="product-category">{product.category}</p>
          <h3 className="product-name">{product.name}</h3>
          <div className="product-footer">
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button className="quick-add-btn">+</button>
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <div className="home">
      {/* Carousel */}
      <Carousel />

      {/* Main Content with Sidebar */}
      <div className="home-layout">
        <div className="sidebar-wrapper">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            onClearFilters={handleClearFilters}
            products={products}
          />
          
          {/* Sidebar Bottom Content - Fills empty space */}
          <div className="sidebar-bottom-content">
            <div className="promo-banner">
              <div className="promo-icon">🎉</div>
              <h3>Special Offer</h3>
              <p>Get 20% off on all electronics</p>
              <Link to="/" className="promo-btn">Shop Now</Link>
            </div>
            
            <div className="trending-section">
              <h4>🔥 Trending Now</h4>
              <div className="trending-items">
                {products.slice(0, 3).map(product => (
                  <Link key={product._id} to={`/product/${product._id}`} className="trending-item">
                    <img src={product.image} alt={product.name} />
                    <div className="trending-info">
                      <p className="trending-name">{product.name.substring(0, 30)}...</p>
                      <p className="trending-price">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="newsletter-box">
              <div className="newsletter-icon">📧</div>
              <h4>Stay Updated</h4>
              <p>Get exclusive deals & offers</p>
              <button className="newsletter-btn">Subscribe</button>
            </div>
            
            <div className="trust-badges">
              <div className="trust-item">
                <span className="trust-icon">✓</span>
                <span>Free Shipping</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">✓</span>
                <span>Secure Payment</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">✓</span>
                <span>Easy Returns</span>
              </div>
            </div>
            
            <div className="quick-categories">
              <h4>Shop by Category</h4>
              <div className="category-links">
                {categories.filter(cat => cat !== 'all').slice(0, 4).map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`category-link ${selectedCategory === category ? 'active' : ''}`}
                  >
                    <span className="category-emoji">
                      {category === "men's clothing" ? "👔" : 
                       category === "women's clothing" ? "👗" : 
                       category === "electronics" ? "📱" : 
                       category === "jewelery" ? "💍" : "🛍️"}
                    </span>
                    <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="customer-reviews">
              <h4>⭐ Customer Reviews</h4>
              <div className="review-item">
                <div className="review-stars">⭐⭐⭐⭐⭐</div>
                <p className="review-text">"Amazing quality products and fast delivery!"</p>
                <p className="review-author">- Sarah M.</p>
              </div>
              <div className="review-item">
                <div className="review-stars">⭐⭐⭐⭐⭐</div>
                <p className="review-text">"Best shopping experience ever!"</p>
                <p className="review-author">- John D.</p>
              </div>
            </div>
            
            <div className="flash-sale">
              <div className="sale-icon">⚡</div>
              <h4>Flash Sale</h4>
              <p className="sale-text">Limited time offers</p>
              <div className="sale-timer">
                <span className="timer-label">Ends in:</span>
                <span className="timer-value">23:59:45</span>
              </div>
              <Link to="/" className="sale-btn">View Deals</Link>
            </div>
            
            <div className="popular-brands">
              <h4>Popular Brands</h4>
              <div className="brands-grid">
                <div className="brand-item">Nike</div>
                <div className="brand-item">Adidas</div>
                <div className="brand-item">Apple</div>
                <div className="brand-item">Samsung</div>
              </div>
            </div>
            
            <div className="support-section">
              <h4>Need Help?</h4>
              <div className="support-links">
                <a href="#" className="support-link">📞 Contact Us</a>
                <a href="#" className="support-link">❓ FAQ</a>
                <a href="#" className="support-link">📦 Track Order</a>
                <a href="#" className="support-link">↩️ Returns</a>
              </div>
            </div>
            
            <div className="social-section">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="#" className="social-link">📘 Facebook</a>
                <a href="#" className="social-link">📷 Instagram</a>
                <a href="#" className="social-link">🐦 Twitter</a>
                <a href="#" className="social-link">▶️ YouTube</a>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <section id="products" className="products-section">
          {/* All Products Section - First */}
          <div className="products-header">
            <h2 className="section-title">
              {selectedCategory === 'all' ? 'All Products' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`}
            </h2>
            <p className="products-count">{filteredProducts.length} products found</p>
          </div>
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found matching your filters.</p>
              <button onClick={handleClearFilters} className="clear-filters-link">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => renderProductCard(product))}
            </div>
          )}

          {/* Featured Products Section */}
          {selectedCategory === 'all' && (
            <>
              <div className="section-header">
                <h2 className="section-title">⭐ Featured Products</h2>
                <p className="section-subtitle">Top rated products you'll love</p>
              </div>
              <div className="products-grid featured-grid">
                {featuredProducts.map(product => renderProductCard(product, true, 'Featured'))}
              </div>
            </>
          )}

          {/* Best Deals Section */}
          {selectedCategory === 'all' && (
            <>
              <div className="section-header">
                <h2 className="section-title">🔥 Best Deals</h2>
                <p className="section-subtitle">Great products at amazing prices</p>
              </div>
              <div className="products-grid deals-grid">
                {bestDeals.map(product => renderProductCard(product, true, 'Best Deal'))}
              </div>
            </>
          )}

          {/* New Arrivals Section */}
          {selectedCategory === 'all' && (
            <>
              <div className="section-header">
                <h2 className="section-title">🆕 New Arrivals</h2>
                <p className="section-subtitle">Check out our latest products</p>
              </div>
              <div className="products-grid new-arrivals-grid">
                {newArrivals.map(product => renderProductCard(product, true, 'New'))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;

