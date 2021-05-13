import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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
          <Home />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App3;
