import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMenusGroupedByCategory } from '../../hooks/useMenuCategories';
import { useBeersGroupedByCategory } from '../../hooks/useBeerCategories';
import { useSettings } from '../../hooks/useSettings';
import './home.scss';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // Fetch data once on mount (users can refresh if they want updates)
  const { data: menusByCategory = [], isLoading: menusLoading } = useMenusGroupedByCategory();
  const { data: beersByCategory = [], isLoading: beersLoading } = useBeersGroupedByCategory();
  const { data: settings, isLoading: settingsLoading } = useSettings();
  const loading = menusLoading || beersLoading || settingsLoading;

  // Extract settings with defaults
  const restaurantName = settings?.restaurantName || 'Your Restaurant Here';
  const tagline = settings?.tagline || 'Craft Beers & Culinary Excellence';
  const backgroundImage = settings?.backgroundImageUrl;
  const uncategorizedLabel = settings?.uncategorizedLabel ?? 'Uncategorized';

  // Filter categories to only show those with available items
  const visibleMenuCategories = menusByCategory.filter(cat =>
    cat.items && cat.items.some(item => item.available)
  );

  const visibleBeerCategories = beersByCategory.filter(cat =>
    cat.items && cat.items.some(item => item.available)
  );

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

    // Animate category titles and menu items
    const categorySections = document.querySelectorAll('.menu-category-section');
    categorySections.forEach((section) => {
      const title = section.querySelector('.category-title');
      const cards = section.querySelectorAll('.menu-card');

      // Set initial state to visible (only if elements exist)
      if (title) {
        gsap.set(title, { opacity: 1, y: 0 });
      }
      gsap.set(cards, { opacity: 1, y: 0 });

      // Animate on scroll (only if title exists)
      if (title) {
        gsap.from(title, {
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            toggleActions: 'play none none none'
          },
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      }

      gsap.from(cards, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out'
      });
    });

    // Animate beer category sections
    const beerCategorySections = document.querySelectorAll('.beer-category-section');
    beerCategorySections.forEach((section) => {
      const title = section.querySelector('.category-title');
      const cards = section.querySelectorAll('.beer-card');

      // Set initial state to visible (only if elements exist)
      if (title) {
        gsap.set(title, { opacity: 1, y: 0 });
      }
      gsap.set(cards, { opacity: 1, y: 0 });

      // Animate on scroll (only if title exists)
      if (title) {
        gsap.from(title, {
          scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
        });
      }

      gsap.from(cards, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out'
      });
    });

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

    // Cleanup ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [loading]); // Only re-run when loading changes (once on mount)

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
          <h1 className="hero-title">{restaurantName}</h1>
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

        {visibleMenuCategories.map((category) => {
          const shouldShowTitle = category.category_name !== 'Uncategorized' || uncategorizedLabel;
          return (
          <div key={category.category_id || category.category_name} className="menu-category-section">
            {shouldShowTitle && (
              <h3 className="category-title">
                {category.category_name === 'Uncategorized' ? uncategorizedLabel : category.category_name}
              </h3>
            )}

            <div className="menu-grid">
              {category.items.filter(item => item.available).map((menu) => (
                <div key={menu.id} className="menu-card">
                  <div className="card-accent"></div>
                  <div className="card-content">
                    <h4 className="menu-item-name">{menu.item}</h4>
                    {menu.detail && (
                      <p className="menu-item-detail">{menu.detail}</p>
                    )}
                    <div className="menu-item-price">
                      <span className="price-label">$</span>
                      <span className="price-value">{formatPrice(menu.price)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          );
        })}
      </section>

      {/* Beer Section */}
      <section ref={beerSectionRef} className="beer-section">
        <div className="section-header">
          <h2 className="section-title">Craft Beers</h2>
          <div className="title-underline"></div>
        </div>

        {visibleBeerCategories.map((category) => {
          const shouldShowTitle = category.category_name !== 'Uncategorized' || uncategorizedLabel;

          return (
          <div key={category.category_id || category.category_name} className="beer-category-section">
            {shouldShowTitle && (
              <h3 className="category-title">
                {category.category_name === 'Uncategorized' ? uncategorizedLabel : category.category_name}
              </h3>
            )}

            <div className="beer-grid">
              {category.items.filter(item => item.available).map((beer) => (
                <div key={beer.id} className="beer-card">
                  <div className="beer-card-inner">
                    <div className="beer-icon">🍺</div>
                    <h4 className="beer-brewery">{beer.brewery}</h4>
                    <p className="beer-style">{beer.style}</p>
                    <div className="beer-details">
                      <span className="beer-abv">{formatPrice(beer.abv)}% ABV</span>
                      <span className="beer-price">${formatPrice(beer.price)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          );
        })}
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2026 {restaurantName}. All rights reserved.</p>
      </footer>
    </div>
  );
}
