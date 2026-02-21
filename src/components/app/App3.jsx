import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Header from '../pages/Header';
import Home from '../pages/Home';
import PrivateRoute from '../auth/PrivateRoute';
import AuthProvider from '../auth/AuthProvider';

const App3 = () => {
  const [menuState, setMenuState] = useState(false);
  return (
    <div className="app container">
      <Router>
        <Header menuState={menuState} setMenuState={setMenuState} />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App3;
