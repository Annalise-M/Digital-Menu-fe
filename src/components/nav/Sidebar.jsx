import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import AuthProvider from '../auth/AuthProvider';
import Dashboard from '../dashboard/dashboard';
import Home from '../home/Home';
import Signup from '../auth/Signup';
import PrivateRoute from '../auth/PrivateRoute';
import Login from '../auth/Login';


export default class Sidebar extends Component {
  render() {
    return <>
    <div className="container">

      <BrowserRouter>
        <div className="row">

        {/* MENU */}
        <nav>
          <Link to="/">Home</Link>
          <Link to="/Signup">Signup</Link>
          <Link to="/Login">Login</Link>
          {/* <Link to="/Dashboard">Dashboard</Link> */}
        </nav>

        {/* CONTENT */}
        <div>
          <AuthProvider>
            <Route exact path="/" component={Home}>
              {/* { ({ match }) => <Home show={match!== null} /> } */}
            </Route>
              
            <Route exact path="/signup" component={Signup}>
              {/* { ({ match }) => <Signup show={match!== null} /> } */}
            </Route>

            <Route exact path="/login" component={Login}>
              {/* { ({ match }) => <Signup show={match!== null} /> } */}
            </Route>

            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </AuthProvider>
        </div>
        
        </div>
      </BrowserRouter>

    </div>
  </>
  }
};

