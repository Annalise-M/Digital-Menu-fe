import React from 'react';
import { 
  Route, 
  Switch,  
  Link,
} from 'react-router-dom';
import Home from '../pages/Home';
import Signup from '../auth/Signup';
import AuthProvider from '../auth/AuthProvider';
import Login from '../auth/Login';
// import Dashboard from '../pages/Dashboard';
// import PrivateRoute from '../auth/PrivateRoute';

const NavContent = () => (
  <div className="">
    <nav className="sidebarNavOverlay">
      <div className="sidebar-top">
        <div className="links-wrapper">
          <Link to="/">Home</Link>
          <Link to="/Signup">Signup</Link>
          <Link to="/Login">Login</Link>
        <Switch>
          <AuthProvider>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />

            {/* This is a private route for admin to change global state. Need to find better placement with this component... */}

            {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
            
          </AuthProvider>
        </Switch>
          
        </div>
      </div>
      <div className="sidebar-bottom"></div>
    </nav>
  </div>
);

export default NavContent; 