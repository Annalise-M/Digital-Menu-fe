import { useSpring, animated } from '@react-spring/web';
import React, { useRef } from 'react';
import NavContent from './NavContent';

const Sidebar2 = ({ show }) => {
  const navButton = useRef(); 
  const { right } = useSpring({
    from: { right: "-100%" },
    right: show ? "0" : "-100%",
    reset: true
  });
  
  return (
    <div>
      <animated.div 
        style={{ right: right, position: 'fixed' }} 
        className="sidebar-top"
        ref={navButton}
      >
        <div>
          <NavContent />
        </div>
      </animated.div>
    </div>
  )
};

export default Sidebar2;
