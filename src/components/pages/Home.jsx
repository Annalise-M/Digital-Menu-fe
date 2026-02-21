import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMenus } from '../../hooks/useMenus';
import { useBeers } from '../../hooks/useBeers';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { data: menus = [], isLoading: menusLoading } = useMenus();
  const { data: beers = [], isLoading: beersLoading } = useBeers();
  const loading = menusLoading || beersLoading;

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-dark">
        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-6 text-xl text-gray-400">Loading menu...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-dark-darker to-dark overflow-hidden"
      >
        <div className="section-container text-center z-10">
          <h1 className="hero-title text-6xl md:text-7xl lg:text-8xl font-bold text-gold mb-6 text-shadow">
            Welcome to The Traveling Taphouse
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-8">
            Craft Beers & Culinary Excellence
          </p>
          <div className="w-32 h-1 mx-auto bg-gradient-gold rounded-full glow-gold"></div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMjYsMjA0LDAsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      </section>

      {/* Menu Section */}
      <section ref={menuSectionRef} className="py-20 bg-dark">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gold mb-4">Our Menu</h2>
            <div className="w-24 h-1 mx-auto bg-gradient-gold rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menus.map((menu) => (
              <div
                key={menu.id}
                className="menu-card group relative bg-dark-lighter rounded-2xl p-8 border border-gray-800 hover:border-gold transition-all duration-500 hover:shadow-2xl hover:shadow-gold/20 transform hover:-translate-y-2"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-gold opacity-10 rounded-bl-full transform group-hover:scale-150 transition-transform duration-500"></div>
                <h3 className="text-2xl font-bold text-gray-100 mb-3 relative z-10">
                  {menu.item}
                </h3>
                {menu.detail && (
                  <p className="text-gray-400 mb-4 leading-relaxed relative z-10">
                    {menu.detail}
                  </p>
                )}
                <div className="flex items-baseline gap-1 relative z-10">
                  <span className="text-gold text-3xl font-bold">$</span>
                  <span className="text-gold text-4xl font-bold">{formatPrice(menu.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beer Section */}
      <section ref={beerSectionRef} className="py-20 bg-dark-darker">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gold mb-4">On Tap</h2>
            <div className="w-24 h-1 mx-auto bg-gradient-gold rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {beers.map((beer) => (
              <div
                key={beer.id}
                className="beer-card group bg-dark-lighter rounded-2xl p-6 border border-gray-800 hover:border-gold transition-all duration-500 hover:shadow-xl hover:shadow-gold/20 text-center transform hover:scale-105"
              >
                <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                  🍺
                </div>
                <h3 className="text-xl font-bold text-gold mb-2">{beer.brewery}</h3>
                <p className="text-gray-400 mb-4 text-sm">{beer.style}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                  <span className="text-gray-500 text-sm font-medium">
                    {formatPrice(beer.abv)}% ABV
                  </span>
                  <span className="text-gold text-2xl font-bold">
                    ${formatPrice(beer.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-dark-darker border-t border-gray-900">
        <div className="section-container text-center">
          <p className="text-gray-500">
            &copy; 2026 The Traveling Taphouse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
