import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Premium Quality Bags',
      subtitle: 'Shop the latest collection',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1920',
      link: '/#products',
      buttonText: 'Shop Now'
    },
    {
      id: 2,
      title: 'Exclusive Deals',
      subtitle: 'Up to 50% off on selected items',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1920',
      link: '/#products',
      buttonText: 'Explore Deals'
    },
    {
      id: 3,
      title: 'New Arrivals',
      subtitle: 'Discover trending styles',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1920',
      link: '/#products',
      buttonText: 'View Collection'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="carousel-content">
              <h2 className="carousel-title">{slide.title}</h2>
              <p className="carousel-subtitle">{slide.subtitle}</p>
              <Link to={slide.link} className="carousel-button">
                {slide.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-nav carousel-prev" onClick={goToPrevious}>
        ‹
      </button>
      <button className="carousel-nav carousel-next" onClick={goToNext}>
        ›
      </button>

      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;



