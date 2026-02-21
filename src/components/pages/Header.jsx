import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoBeerOutline } from "react-icons/io5";
import Sidebar2 from './Sidebar2';
// This Header component should trigger the menu
// on click show / hide sidebar
// state is maintained in App3 component

const Header = () => {
  const [menuState, setMenuState] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-darker/95 backdrop-blur-md border-b border-gray-900 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group transition-all duration-300"
          >
            <div className="text-gold text-4xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
              <IoBeerOutline />
            </div>
            <span className="text-xl md:text-2xl font-bold text-gold group-hover:text-gold-light transition-colors">
              The Traveling Taphouse
            </span>
          </Link>

          {/* Menu Button */}
          <div className="flex items-center">
            <Sidebar2 show={menuState} />
            <button
              onClick={() => setMenuState(!menuState)}
              className="relative w-12 h-12 flex flex-col justify-center items-center gap-1.5 hover:bg-dark-lighter rounded-lg transition-all duration-300 group"
              aria-label="Toggle menu"
            >
              <span
                className={`w-7 h-0.5 bg-gold rounded-full transition-all duration-300 ${
                  menuState ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span
                className={`w-7 h-0.5 bg-gold rounded-full transition-all duration-300 ${
                  menuState ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`w-7 h-0.5 bg-gold rounded-full transition-all duration-300 ${
                  menuState ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
