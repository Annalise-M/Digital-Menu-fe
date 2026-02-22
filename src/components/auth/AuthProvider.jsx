import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getVerify, postLogin, postSignup } from '../../services/auth/auth';

const AuthProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // backend call on creating admin
  const signup = (email, password) => {
    return postSignup(email, password)
      .then(admin => {
        setCurrentAdmin(admin);
        navigate('/dashboard');
        return admin;
      })
      .catch(error => {
        console.error('Signup failed:', error);
        throw error; // Re-throw to allow component to catch it
      })
      .finally(() => setLoading(false));
  };

  // logging in admin
  const login = (email, password) => {
    return postLogin(email, password)
      .then(admin => {
        setCurrentAdmin(admin);
        navigate('/dashboard');
        return admin;
      })
      .catch(error => {
        console.error('Login failed:', error);
        throw error; // Re-throw to allow component to catch it
      })
      .finally(() => setLoading(false));
  };

  // logout admin
  const logout = () => {
    setCurrentAdmin(null);
    navigate('/');
  };

  // verifies session cookie and sets current admin
  useEffect(() => {
    getVerify()
      .then(admin => setCurrentAdmin(admin))
      .catch(() => {
        // User not authenticated, leave currentAdmin as null
      })
      .finally(() => setLoading(false));
  }, []);

  const authState = {
    currentAdmin,
    loading,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
