import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import './draggableGrid.scss';

gsap.registerPlugin(Draggable);

const DraggableGrid = ({ children, className = '' }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    const cards = grid.querySelectorAll('.grid-item');

    cards.forEach(card => {
      Draggable.create(card, {
        type: 'x,y',
        bounds: grid,
        inertia: true,
        onDragStart: () => {
          gsap.to(card, { scale: 1.05, duration: 0.2 });
        },
        onDragEnd: () => {
          gsap.to(card, { scale: 1, duration: 0.2 });
        }
      });
    });
  }, [children]);

  return (
    <div ref={gridRef} className={`draggable-grid ${className}`}>
      {children}
    </div>
  );
};

export default DraggableGrid; 