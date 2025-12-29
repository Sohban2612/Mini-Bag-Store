import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    const handleOverlayClick = (event) => {
      if (isMobileMenuOpen && event.target.classList.contains('mobile-menu-overlay')) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleEscape);
    
    // Close mobile menu on route change
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('click', handleOverlayClick);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowMenu(false);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">👜</span>
          <span className="brand-text">Mini Bag Store</span>
        </Link>
        
        {isMobileMenuOpen && (
          <div 
            className="mobile-menu-overlay" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        <div className={`navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/cart" className="nav-link cart-link" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Cart</span>
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
          
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? '☀️' : '🌙'}
          </button>

          {isAuthenticated ? (
            <div className="user-menu" ref={menuRef}>
              <button 
                className="user-button"
                onClick={() => {
                  setShowMenu(!showMenu);
                  setIsMobileMenuOpen(false);
                }}
              >
                <span className="user-icon">👤</span>
                <span className="user-name">{user?.name?.split(' ')[0]}</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              {showMenu && (
                <div className="dropdown-menu">
                  <div className="user-info">
                    <p className="user-name-full">{user?.name}</p>
                    <p className="user-email">{user?.email}</p>
                  </div>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link login-link" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="nav-link signup-link" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
            </div>
          )}
        </div>

        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'mobile-open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

