import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthLoading, useCurrentAdmin } from '../../context/AuthContext';

const PrivateRoute = props => {
  const currentAdmin = useCurrentAdmin();
  const loading = useAuthLoading();
  if(loading) return <h1>Loading...</h1>;

  // Links to response link
  // history.push as res to submits or admin interaction
  // Redirects in res to page load

  // If not logged in, redirects to login
  if(!currentAdmin) return <Redirect to="/login" />;

  // if admin is logged in
  return <Route {...props} />;
};

export default PrivateRoute;
