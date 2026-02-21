import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getMenus } from '../../services/api/menusApi';
import { getBeers } from '../../services/api/beersApi';
import './home.scss';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [menus, setMenus] = useState([]);
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef(null);
  const menuSectionRef = useRef(null);
  const beerSectionRef = useRef(null);

  useEffect(() => {
    // Fetch menu and beer data
    const fetchData = async () => {
      try {
        const [menuData, beerData] = await Promise.all([
          getMenus(),
          getBeers()
        ]);
        setMenus(menuData);
        setBeers(beerData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loading) return;

    // Hero animation
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power3.out'
    });

    // Menu items stagger animation
    if (menus.length > 0) {
      gsap.from('.menu-card', {
        scrollTrigger: {
          trigger: menuSectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      });
    }

    // Beer items stagger animation
    if (beers.length > 0) {
      gsap.from('.beer-card', {
        scrollTrigger: {
          trigger: beerSectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        scale: 0.8,
        stagger: 0.12,
        duration: 0.7,
        ease: 'back.out(1.4)'
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
        <p>Loading menu...</p>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Our Taphouse</h1>
          <p className="hero-subtitle">Craft Beers & Culinary Excellence</p>
          <div className="hero-divider"></div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="menu-section" ref={menuSectionRef}>
        <div className="section-header">
          <h2 className="section-title">Our Menu</h2>
          <div className="title-underline"></div>
        </div>

        <div className="menu-grid">
          {menus.map((menu) => (
            <div key={menu.id} className="menu-card">
              <div className="card-content">
                <h3 className="menu-item-name">{menu.item}</h3>
                {menu.detail && <p className="menu-item-detail">{menu.detail}</p>}
                <div className="menu-item-price">
                  <span className="price-label">$</span>
                  <span className="price-value">{formatPrice(menu.price)}</span>
                </div>
              </div>
              <div className="card-accent"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Beer Section */}
      <section className="beer-section" ref={beerSectionRef}>
        <div className="section-header">
          <h2 className="section-title">On Tap</h2>
          <div className="title-underline"></div>
        </div>

        <div className="beer-grid">
          {beers.map((beer) => (
            <div key={beer.id} className="beer-card">
              <div className="beer-card-inner">
                <div className="beer-icon">🍺</div>
                <h3 className="beer-brewery">{beer.brewery}</h3>
                <p className="beer-style">{beer.style}</p>
                <div className="beer-details">
                  <span className="beer-abv">{formatPrice(beer.abv)}% ABV</span>
                  <span className="beer-price">${formatPrice(beer.price)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2026 Taphouse. All rights reserved.</p>
      </footer>
    </div>
  );
}
