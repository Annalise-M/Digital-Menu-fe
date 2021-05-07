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
    reset: true
  });

  
  return (
    <animated.div 
    style={{ right: right, position: 'fixed' }} 
    className="sidebar-top" 
    ref={navButton}
    >
      <div>
        <NavContent />
      </div>
    </animated.div>
  )
};

export default Sidebar2;
