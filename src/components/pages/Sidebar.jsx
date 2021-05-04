import React, { useRef, useEffect } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { gsap } from 'gsap';
// import AuthProvider from '../auth/AuthProvider';
// import Dashboard from './Dashboard';
// import Home from './Home';
// import Signup from '../auth/Signup';
// import PrivateRoute from '../auth/PrivateRoute';
// import Login from '../auth/Login';


const Sidebar = props => {
  const sidebarMenu = useRef(null);
  const sidebarMenuOverlay = useRef(null);
  const menuLayer = useRef(null);
  const menuTimeline = useRef();

  const { menuState, setMenuState } = props;

  useEffect(() => {
    menuTimeline.current = gsap.timeline({ paused: true });
    menuTimeline.current.fromTo(
      [sidebarMenuOverlay, menuLayer, sidebarMenu],
      {
        duration: 0,
        x: '100%'
      },
      {
        duration: 0.75,
        x: '0%',
        ease: 'power3.inOut',
        stagger: {
          amount: 0.5
        }
      }
    );
  }, []);

  useEffect(() => {
    menuState ? menuTimeline.current.play() : menuTimeline.current.reverse();
  }, [menuState]);

  useEffect(() => {
    const { history } = props;
    history.listen(() => setMenuState(false));
  });

  return (
  <>
    <div className="sidebarNavOverlay"
      ref={sidebarMenuOverlay}
      onClick={() => setMenuState(false)}></div>
        <div className="menu-wrapper">
          <div className="menu-layer" ref={menuLayer}></div>
 
          <nav className="sidebarNav" ref={sidebarMenu}>
            <div className="sidebar-top">
              <div className="link-wrapper">
                <Link to="/">Home</Link>
                <Link to="/Signup">Signup</Link>
                <Link to="/Login">Login</Link>
              </div>
            </div>
            <div className="sidebar-bottom"></div>
          </nav>

          {/* CONTENT */}
          {/* <div>
            <AuthProvider>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </AuthProvider>
          </div> */}
        </div>
        
    </>
  )
};

export default withRouter(Sidebar);