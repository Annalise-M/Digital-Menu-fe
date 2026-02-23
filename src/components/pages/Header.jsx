import React from 'react';
import { Link } from 'react-router-dom';
import { IoBeerOutline } from "react-icons/io5";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useSettings } from '../../hooks/useSettings';
import { useTheme } from '../../context/ThemeContext';
import Sidebar2 from './Sidebar2';
// This Header component should trigger the menu
// on click show / hide sidebar
// state is maintained in App3 component

const Header = ({ menuState, setMenuState }) => {
  const { data: settings } = useSettings();
  const { theme, toggleTheme } = useTheme();
  const restaurantName = settings?.restaurantName || 'The Traveling Taphouse';

  return (
    <div className="site-header">
      <header>
        {/* Brand */}
        <div className="brand-icon">
          <Link to="/">
            <span className="icon">
              <IoBeerOutline />
            </span>
            {restaurantName}
          </Link>
        </div>

        {/* Controls */}
        <div className="header-controls">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <IoSunnyOutline /> : <IoMoonOutline />}
          </button>

          {/* Menu Button */}
          <button
            onClick={() => setMenuState(!menuState)}
            className={`menu-trigger ${menuState ? 'menu-close' : ''}`}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <Sidebar2 show={menuState} setMenuState={setMenuState} />
      </header>
    </div>
  );
};

export default Header;
