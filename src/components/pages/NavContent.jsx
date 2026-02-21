import React from 'react';
import { Link } from 'react-router-dom';

const NavContent = () => (
  <div className="">
    <nav className="sidebarNavOverlay">
      <div className="sidebar-top">
        <div className="links-wrapper">
          <Link to="/">Home</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
      <div className="sidebar-bottom"></div>
    </nav>
  </div>
);

export default NavContent; 