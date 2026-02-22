import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMenus } from '../../hooks/useMenus';
import { useBeers } from '../../hooks/useBeers';
import { useSettings } from '../../hooks/useSettings';
import './home.scss';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // Enable real-time polling every 10 seconds for public display
  const { data: menus = [], isLoading: menusLoading } = useMenus({
    refetchInterval: 10000, // Poll every 10 seconds
  });
  const { data: beers = [], isLoading: beersLoading } = useBeers({
    refetchInterval: 10000, // Poll every 10 seconds
  });
  const { data: settings, isLoading: settingsLoading } = useSettings();
  const loading = menusLoading || beersLoading || settingsLoading;

  // Extract settings with defaults
  const restaurantName = settings?.restaurantName || 'The Traveling Taphouse';
  const tagline = settings?.tagline || 'Craft Beers & Culinary Excellence';
  const backgroundImage = settings?.backgroundImageUrl;

  const heroRef = useRef(null);
  const menuSectionRef = useRef(null);
  const beerSectionRef = useRef(null);

  useEffect(() => {
    if (loading) return;

    // Hero animation
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power3.out'
    });

    // Menu items stagger animation - using set() first to ensure visibility
    if (menus.length > 0) {
      const menuCards = document.querySelectorAll('.menu-card');
      gsap.set(menuCards, { opacity: 1, y: 0 }); // Ensure visible first
      gsap.from(menuCards, {
        scrollTrigger: {
          trigger: menuSectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out'
      });
    }

    // Beer items stagger animation - using set() first to ensure visibility
    if (beers.length > 0) {
      const beerCards = document.querySelectorAll('.beer-card');
      gsap.set(beerCards, { opacity: 1, scale: 1 }); // Ensure visible first
      gsap.from(beerCards, {
        scrollTrigger: {
          trigger: beerSectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out'
      });
    }

    // Parallax effect on scroll
    gsap.to('.hero-title', {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: 150,
      opacity: 0.3
    });
  }, [loading, menus, beers]);

  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : parseFloat(price).toFixed(2);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading the finest selections...</p>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="hero"
        style={backgroundImage ? { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${backgroundImage})` } : {}}
      >
        <div className="hero-content">
          <h1 className="hero-title">Welcome to {restaurantName}</h1>
          <p className="hero-subtitle">{tagline}</p>
          <div className="hero-divider"></div>
        </div>
      </section>

      {/* Menu Section */}
      <section ref={menuSectionRef} className="menu-section">
        <div className="section-header">
          <h2 className="section-title">Our Menu</h2>
          <div className="title-underline"></div>
        </div>

        <div className="menu-grid">
          {menus.map((menu) => (
            <div key={menu.id} className={`menu-card ${!menu.available ? 'unavailable' : ''}`}>
              <div className="card-accent"></div>
              <div className="card-content">
                <h3 className="menu-item-name">{menu.item}</h3>
                {menu.detail && (
                  <p className="menu-item-detail">{menu.detail}</p>
                )}
                <div className="menu-item-price">
                  <span className="price-label">$</span>
                  <span className="price-value">{formatPrice(menu.price)}</span>
                </div>
                {!menu.available && <div className="sold-out-badge">SOLD OUT</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Beer Section */}
      <section ref={beerSectionRef} className="beer-section">
        <div className="section-header">
          <h2 className="section-title">On Tap</h2>
          <div className="title-underline"></div>
        </div>

        <div className="beer-grid">
          {beers.map((beer) => (
            <div key={beer.id} className={`beer-card ${!beer.available ? 'unavailable' : ''}`}>
              <div className="beer-card-inner">
                <div className="beer-icon">🍺</div>
                <h3 className="beer-brewery">{beer.brewery}</h3>
                <p className="beer-style">{beer.style}</p>
                <div className="beer-details">
                  <span className="beer-abv">{formatPrice(beer.abv)}% ABV</span>
                  <span className="beer-price">${formatPrice(beer.price)}</span>
                </div>
                {!beer.available && <div className="sold-out-badge">SOLD OUT</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2026 {restaurantName}. All rights reserved.</p>
      </footer>
    </div>
  );
}
