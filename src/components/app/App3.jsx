import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from '../pages/Dashboard';
import Header from '../pages/Header';
import Home from '../pages/Home';
import Settings from '../pages/Settings';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import PrivateRoute from '../auth/PrivateRoute';
import AuthProvider from '../auth/AuthProvider';
import { useSettings } from '../../hooks/useSettings';
import { ThemeProvider } from '../../context/ThemeContext';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Inner component that applies theme colors
const ThemedApp = ({ menuState, setMenuState }) => {
  const { data: settings } = useSettings();

  // Apply CSS custom properties for dynamic theming
  const themeStyles = {
    '--primary-color': settings?.primaryColor || '#D4AF37',
    '--accent-color': settings?.accentColor || '#B87333',
    '--background-color': settings?.backgroundColor || '#1C1C1E',
    '--primary-font': settings?.primaryFont || 'Inter, system-ui, sans-serif',
  };

  return (
    <ThemeProvider>
      <div style={themeStyles}>
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
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </ThemeProvider>
  );
};

const App3 = () => {
  const [menuState, setMenuState] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemedApp menuState={menuState} setMenuState={setMenuState} />
    </QueryClientProvider>
  );
};

export default App3;
