import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthLoading, useCurrentAdmin } from '../../context/AuthContext';

const PrivateRoute = props => {
  const currentAdmin = useCurrentAdmin();
  const loading = useAuthLoading();
  if(loading) return <h1>Loading...</h1>;

  // 1. Link -> in response to a click
  // 2. history.push -> in response to submits or user interaction
  // 3. Redirect -> in response to page load

  // if not logged in
  // redirect to login page
  if(!currentAdmin) return <Redirect to="/" />;

  // if admin is logged in
  return <Route {...props} />;
};

export default PrivateRoute;
