import React from 'react';
import { Link } from 'react-router-dom';
import { IoBeerOutline } from "react-icons/io5";
import { useSettings } from '../../hooks/useSettings';
import Sidebar2 from './Sidebar2';
// This Header component should trigger the menu
// on click show / hide sidebar
// state is maintained in App3 component

const Header = ({ menuState, setMenuState }) => {
  const { data: settings } = useSettings();
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

        {/* Menu Button */}
        <Sidebar2 show={menuState} setMenuState={setMenuState} />
        <button
          onClick={() => setMenuState(!menuState)}
          className={`menu-trigger ${menuState ? 'menu-close' : ''}`}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>
    </div>
  );
};

export default Header;
