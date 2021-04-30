import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import AuthProvider from '../auth/AuthProvider';
import Dashboard from './Dashboard';
import Home from './Home';
import Signup from '../auth/Signup';
import PrivateRoute from '../auth/PrivateRoute';
import Login from '../auth/Login';


const Sidebar = () => {

    return <>
    <div className="container">
        <div className="row">
          {/* MENU */}
          <nav>
            <Link to="/">Home</Link>
            <Link to="/Signup">Signup</Link>
            <Link to="/Login">Login</Link>
          </nav>
          {/* CONTENT */}
          <div>
            {/* <AuthProvider>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </AuthProvider> */}
          </div>
        </div>
      </div>
    </>
};

export default Sidebar;