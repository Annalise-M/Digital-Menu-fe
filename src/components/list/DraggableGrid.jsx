import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import './draggableGrid.scss';

gsap.registerPlugin(Draggable);

const DraggableGrid = ({ children, className = '' }) => {
  const gridRef = useRef(null);
  const draggableInstances = useRef([]);

  useEffect(() => {
    const initializeDraggable = () => {
      const grid = gridRef.current;
      if (!grid) return;

      const cards = grid.querySelectorAll('.grid-item');
      if (!cards.length) return;

      // Calculate grid cell size based on CSS grid
      const gridStyle = window.getComputedStyle(grid);
      const gap = parseInt(gridStyle.gap) || 0;
      const firstCard = cards[0];
      
      if (!firstCard) return;

      const cellWidth = firstCard.offsetWidth + gap;
      const cellHeight = firstCard.offsetHeight + gap;

      // Clear previous instances
      draggableInstances.current.forEach(instance => instance.kill());
      draggableInstances.current = [];

      cards.forEach(card => {
        const draggable = Draggable.create(card, {
          type: 'x,y',
          bounds: grid,
          inertia: true,
          liveSnap: {
            x: function(endValue) {
              // Snap to nearest grid cell horizontally
              return Math.round(endValue / cellWidth) * cellWidth;
            },
            y: function(endValue) {
              // Snap to nearest grid cell vertically
              return Math.round(endValue / cellHeight) * cellHeight;
            }
          },
          onDragStart: () => {
            gsap.to(card, { scale: 1, duration: 0.1 });
          },
          onDragEnd: () => {
            gsap.to(card, { scale: 1, duration: 0.1 });
          },
          radius: 15,
        })[0]; // Draggable.create returns an array, we want the first instance

        draggableInstances.current.push(draggable);
        
      });
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(initializeDraggable, 100);

    return () => {
      clearTimeout(timeoutId);
      // Cleanup Draggable instances
      draggableInstances.current.forEach(instance => instance.kill());
      draggableInstances.current = [];
    };
  }, [children]);

  return (
    <div ref={gridRef} className={`draggable-grid ${className}`}>
      {children}
    </div>
  );
};

export default DraggableGrid; 