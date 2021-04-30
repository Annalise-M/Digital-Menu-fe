import React from 'react';
import { Link } from 'react-router-dom';

// This Header component should trigger the menu
// on click show / hide sidebar
// state is maintained in App3 component

const Header = props => {
  const {menuState, setMenuState} = props;
    return (
    <header>
      <div className="sidebar-icon">
        <Link to="/">
          <div className="icon">
            <i className="ion icon-react"></i>
          </div>
          <span>Traveling Taphouse</span>
        </Link>
      </div>
      <div>
        <button 
          className={`menu-trigger ${menuState ? 'menu-close' : ''}`} 
          onClick={() => setMenuState(!menuState)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
