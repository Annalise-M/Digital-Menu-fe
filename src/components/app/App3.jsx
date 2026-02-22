import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from '../pages/Dashboard';
import Header from '../pages/Header';
import Home from '../pages/Home';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import PrivateRoute from '../auth/PrivateRoute';
import AuthProvider from '../auth/AuthProvider';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App3 = () => {
  const [menuState, setMenuState] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Header menuState={menuState} setMenuState={setMenuState} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
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
    </QueryClientProvider>
  );
};

export default App3;
