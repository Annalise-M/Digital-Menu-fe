import { useSpring, animated } from '@react-spring/web';
import React, { useRef } from 'react';
import NavContent from './NavContent';

const Sidebar2 = ({ show }) => {
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
      {/* Backdrop */}
      <animated.div
        style={backdropAnimation}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />

      {/* Sidebar */}
      <animated.div
        style={{ right }}
        ref={navButton}
        className="fixed top-0 bottom-0 w-80 bg-dark-darker border-l border-gray-900 shadow-2xl z-50"
      >
        <NavContent />
      </animated.div>
    </>
  );
};

export default Sidebar2;
