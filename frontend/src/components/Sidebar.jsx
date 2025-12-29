import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters,
  products = []
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true
  });

  useEffect(() => {
    // Prevent body scroll when sidebar is open on mobile
    if (isOpen && window.innerWidth <= 968) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const hasActiveFilters = selectedCategory !== 'all' || priceRange.min || priceRange.max;

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span className="filter-icon">🔍</span>
        <span>Filters</span>
        {hasActiveFilters && <span className="filter-badge">{selectedCategory !== 'all' ? 1 : 0 + (priceRange.min || priceRange.max ? 1 : 0)}</span>}
      </button>
      
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-header-content">
            <span className="filter-icon-large">🔍</span>
            <h3>Filters</h3>
            {hasActiveFilters && (
              <span className="active-filters-count">
                {selectedCategory !== 'all' ? 1 : 0 + (priceRange.min || priceRange.max ? 1 : 0)} active
              </span>
            )}
          </div>
          <button className="sidebar-close" onClick={() => setIsOpen(false)} aria-label="Close filters">
            ✕
          </button>
        </div>

        <div className="sidebar-content">
          {/* Category Filter */}
          <div className="filter-section">
            <button 
              className="filter-section-header"
              onClick={() => toggleSection('category')}
            >
              <div className="filter-section-title">
                <span className="section-icon">📂</span>
                <h4 className="filter-title">Category</h4>
              </div>
              <span className="expand-icon">{expandedSections.category ? '▼' : '▶'}</span>
            </button>
            {expandedSections.category && (
              <div className="filter-options">
                {categories.map((category) => (
                  <label 
                    key={category} 
                    className={`filter-option ${selectedCategory === category ? 'active' : ''}`}
                  >
                    <div className="custom-radio">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => onCategoryChange(e.target.value)}
                      />
                      <span className="radio-checkmark"></span>
                    </div>
                    <span className="filter-label">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                    {selectedCategory === category && (
                      <span className="check-icon">✓</span>
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="filter-section">
            <button 
              className="filter-section-header"
              onClick={() => toggleSection('price')}
            >
              <div className="filter-section-title">
                <span className="section-icon">💰</span>
                <h4 className="filter-title">Price Range</h4>
              </div>
              <span className="expand-icon">{expandedSections.price ? '▼' : '▶'}</span>
            </button>
            {expandedSections.price && (
              <div className="price-filter-content">
                <div className="price-inputs">
                  <div className="price-input-wrapper">
                    <label className="price-label">Min</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={priceRange.min || ''}
                      onChange={(e) => onPriceRangeChange({ ...priceRange, min: e.target.value })}
                      className="price-input"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <span className="price-separator">-</span>
                  <div className="price-input-wrapper">
                    <label className="price-label">Max</label>
                    <input
                      type="number"
                      placeholder="∞"
                      value={priceRange.max || ''}
                      onChange={(e) => onPriceRangeChange({ ...priceRange, max: e.target.value })}
                      className="price-input"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                {(priceRange.min || priceRange.max) && (
                  <div className="price-display">
                    ${priceRange.min || '0'} - ${priceRange.max || '∞'}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button className="clear-filters-btn" onClick={onClearFilters}>
              <span className="clear-icon">🗑️</span>
              Clear All Filters
            </button>
          )}

          {/* Product Images Gallery */}
          {products.length > 0 && (
            <div className="sidebar-products-gallery">
              <h4 className="gallery-title">Browse Products</h4>
              <div className="gallery-grid">
                {products.slice(0, 12).map((product) => (
                  <Link 
                    key={product._id} 
                    to={`/product/${product._id}`}
                    className="gallery-item"
                    title={product.name}
                  >
                    <img src={product.image} alt={product.name} />
                    <div className="gallery-overlay">
                      <span className="gallery-price">${product.price.toFixed(2)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default Sidebar;

