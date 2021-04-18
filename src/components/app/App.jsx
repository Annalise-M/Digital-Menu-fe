import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import AuthProvider from '../auth/AuthProvider';
import Home from '../home/Home';
import Signup from '../auth/Signup';
import Login from '../auth/Login';
import PrivateRoute from '../auth/PrivateRoute';
import Dashboard from '../dashboard/dashboard';


export default function App() {
  return (
    //Think about wrapping this in a slider w/ react spring.io //
    <AuthProvider>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </AuthProvider>
  );
}
