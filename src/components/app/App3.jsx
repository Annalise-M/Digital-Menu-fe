import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from '../pages/Dashboard';
import Header from '../pages/Header';
import Home from '../pages/Home';
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
      <div className="min-h-screen bg-dark">
        <Router>
          <Header menuState={menuState} setMenuState={setMenuState} />
          <main className="pt-20">
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
          </main>
        </Router>
      </div>
    </QueryClientProvider>
  );
};

export default App3;
