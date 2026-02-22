import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrentAdmin, useLogout } from '../../context/AuthContext';

const NavContent = ({ setMenuState }) => {
  const currentAdmin = useCurrentAdmin();
  const logout = useLogout();

  const handleLogout = () => {
    logout();
    setMenuState(false);
  };

  return (
    <nav className="sidebar-nav">
      <div className="nav-links">
        <Link to="/" onClick={() => setMenuState(false)}>Home</Link>

        {!currentAdmin ? (
          <>
            <Link to="/signup" onClick={() => setMenuState(false)}>Signup</Link>
            <Link to="/login" onClick={() => setMenuState(false)}>Login</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" onClick={() => setMenuState(false)}>Dashboard</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
      <div className="nav-footer">
        <p>&copy; 2026 Taphouse</p>
      </div>
    </nav>
  );
};

export default NavContent; 