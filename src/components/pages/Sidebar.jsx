import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap, { Power3 } from 'gsap/gsap-core';
// import AuthProvider from '../auth/AuthProvider';
// import Dashboard from './Dashboard';
// import Home from './Home';
// import Signup from '../auth/Signup';
// import PrivateRoute from '../auth/PrivateRoute';
// import Login from '../auth/Login';

gsap.registerPlugin(CSSPlugin);

function Sidebar(props) {
  const { menuState, setMenuState } = props;

  const sidebarNav = React.createRef();
  const sidebarNavOverlay = React.createRef();
  const menuLayer = React.createRef();
  const menuTimeline = React.createRef();

  useEffect(() => {
    gsap.timeline('.menuTimeline', {
      paused: true
    });

    gsap.fromTo('.menuTimeline, .sidebarNavOverlay, .menuLayer, .sidebarNav', {
      duration: 0,
      x: '100%'
    }, {
      duration: 0.75,
      x: '0%',
      ease: Power3.inOut,
      stagger: {
        amount: 0.5
      }
    });

  }, []);


  // gsap.registerPlugin(CSSPlugin);
  // useEffect(() => {
  //   gsap.timeline('.menuTimelime', {
  //     paused: true
  //   }),
  //   gsap.fromTo('.sidebarMenuOverlay', '.menuLayer', '.sidebarMenu'(
      
  //     {
  //       duration: 0,
  //       x: '100%'
  //     },
  //     {
  //       duration: 0.75,
  //       x: '0%',
  //       ease: Power3.inOut,
  //       stagger: {
  //         amount: 0.5
  //       }
  //     }
  //   ));
  // }, []);
    
    // gsap.timeline({ paused: true });
    // gsap.fromTo('.menuTimeline'(
    //   [ 'sidebarMenuOverlay', 'menuLayer', 'sidebarMenu'],
    //   {
    //     duration: 0,
    //     x: '100%'
    //   },
    //   {
    //     duration: 0.75,
    //     x: '0%',
    //     ease: Power3.inOut,
    //     stagger: {
    //       amount: 0.5
    //     }
    //   }
    // ));
  //}, []);

  // useEffect(() => {
  //   menuState ? menuTimeline.play() : menuTimeline.reverse();
  // }, [menuState]);

  // useEffect(() => {
  //   const { history } = props;
  //   history.listen(() => setMenuState(false));
  // });
  
  return (
    <>
      <div className="menuTimeline" ref={menuTimeline}>
        <div className="sidebarNavOverlay"
          ref={sidebarNavOverlay}
          onClick={() => setMenuState(true)}></div>
          <div className="menu-wrapper">
            <div className="menu-layer" ref={menuLayer}></div>
  
            <nav className="sidebarNav" ref={sidebarNav}>
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
        
    </div>
  </>
  )
};

export default Sidebar;