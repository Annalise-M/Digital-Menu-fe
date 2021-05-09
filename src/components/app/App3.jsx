import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Header from '../pages/Header';
import Home from '../pages/Home';
import PrivateRoute from '../auth/PrivateRoute';
import AuthProvider from '../auth/AuthProvider';

const App3 = () => {
  const [menuState, setMenuState] = useState(false);
  return (
    <div className="app container">
      <BrowserRouter>
        <Header menuState={menuState} setMenuState={setMenuState} />
        <Home />
        <AuthProvider>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App3;
