import React from 'react';
import { Link } from 'react-router-dom';

const NavContent = () => (
  <div>
    <nav className="sidebarNav">
      <div className="sidebar-top">
        <div className="link-wrapper">
          <Link to="/">Home</Link>
          <Link to="/Signup">Signup</Link>
          <Link to="/Login">Login</Link>
        </div>
      </div>
      <div className="sidebar-bottom"></div>
    </nav>
  </div>
);

export default NavContent; 