import React from 'react';
import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Signup from '../auth/Signup';
import Login from '../auth/Login';
import AuthProvider from '../auth/AuthProvider';
import PrivateRoute from '../auth/PrivateRoute';
import Dashboard from '../dashboard/dashboard';

const routes = [
  <SwitchTransition>
    <AuthProvider>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Router>
    </AuthProvider>
  </SwitchTransition>
]

export default function Home() {
  
  return (
  <>
      <Route key={routes} exact path={routes}>
        {({ match }) => (
          <CSSTransition
            in={match != null}
            timeout={1000}
            classNames="route"
            unmountOnExit
          >
            <div>

            </div>
          </CSSTransition>
        )}
      </Route>
      
      <div classNames="Home">
        <header>
          <title>
            Restaurant Name Here
          </title>
        </header>
        <body>
          <h1>
            This is the public visable menu.
          </h1>
        </body>
      </div>
  </>
  )
};

