import { useSpring, animated } from '@react-spring/web';
import React, { useRef } from 'react';
import NavContent from './NavContent';
// import { Link } from 'react-router-dom';

const Sidebar2 = ({ show }) => {
  const navButton = useRef(); 
  // const [ state, setState ] = useState(false);
  const { right } = useSpring({
    from: { right: "-100%" },
    right: show ? "0" : "-100%",
    transition: "easeInOut"
  });

  
  return (
    <animated.div style={{ right: right, position: 'fixed' }} className="Sidebar" ref={navButton}>
      <div className="sidebarNavOverlay">
        <NavContent />
        {/* <div className="sidebarNavOverlay"></div> */}
          {/* <div className="menu-wrapper">
            <div className="menu-layer"></div> */}
  
            {/* <nav className="sidebarNav">
              <div className="sidebar-top">
                <div className="link-wrapper">
                  <Link to="/">Home</Link>
                  <Link to="/Signup">Signup</Link>
                  <Link to="/Login">Login</Link>
                </div>
              </div>
              <div className="sidebar-bottom"></div>
            </nav> */}
        </div>
        
    {/* </div> */}
    </animated.div>
  )
};

export default Sidebar2;
