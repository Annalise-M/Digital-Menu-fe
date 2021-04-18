import React, { useContext } from 'react';

export const AuthContext = React.createContext(null);

// Admin Signup
export const useSignup = () => {
  const { signup } = useContext(AuthContext);
  return signup;
};

// Admin Login
export const useLogin = () => {
  const { login } = useContext(AuthContext);
  return login;
};

// Current Admin
export const useCurrentAdmin = () => {
  const { currentAdmin } = useContext(AuthContext);
  return currentAdmin;
};

// Auth Loading
export const useAuthLoading = () => {
  const { loading } = useContext(AuthContext);
  return loading;
};
