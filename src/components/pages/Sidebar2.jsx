import { useSpring, animated } from '@react-spring/web';
import React, { useRef } from 'react';
import NavContent from './NavContent';

const Sidebar2 = ({ show, setMenuState }) => {
  const navButton = useRef();
  const { right } = useSpring({
    from: { right: "-100%" },
    right: show ? "0" : "-100%",
    config: { tension: 280, friction: 60 }
  });

  const backdropAnimation = useSpring({
    opacity: show ? 1 : 0,
    pointerEvents: show ? 'auto' : 'none',
    config: { duration: 300 }
  });

  return (
    <>
      {/* Backdrop - Click to close */}
      <animated.div
        style={backdropAnimation}
        className="sidebar-backdrop"
        onClick={() => setMenuState(false)}
      />

      {/* Sidebar */}
      <animated.div
        style={{ right }}
        ref={navButton}
        className="sidebar-panel"
      >
        <NavContent setMenuState={setMenuState} />
      </animated.div>
    </>
  );
};

export default Sidebar2;
