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
    <div className="site-header">
      <header>
        <div className="brand-icon">
          <Link to="/">
            <div className="icon">
              <i className="io beer-icon">
                <IoBeerOutline />
              </i>
            </div>
            <span>The Traveling Taphouse</span>
          </Link>
        </div>
        <div>
          <Sidebar2 show={menuState}/>
          <button 
            className={`menu-trigger ${menuState ? 'menu-close' : ''}`} 
            onClick={() => setMenuState(!menuState)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
