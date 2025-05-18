import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './allLists.scss';

gsap.registerPlugin(Draggable, useGSAP);

export default function BeerItemCards() {
  const container = useRef();
  const drag = useRef();

  useGSAP(() => {
   () => {
      drag.current = Draggable.create(container.current, {
        type: 'x, y',
        bounds: container.current,
        onDragStart: () => {
          gsap.to(container.current, { scale: 1.1 });
        },
        onDragEnd: () => {
          gsap.to(container.current, { scale: 1 });
        },
      });
    }
    drag.from(container.current, {
      duration: 1,
      opacity: 0,
      y: -50,
      ease: 'power2.out',
    });
  }, [container]);

  const BeerItemCard = ({ beer, handleDelete }) => {
    <figure className="beer-card">
    <img src={beer.image} alt={beer.name} />
    <figcaption>
      <h3>{beer.name}</h3>
      <p>{beer.brewery}</p>
      <p>{beer.style}</p>
      <p>{beer.abv}</p>
      <p>{beer.price}</p>
    </figcaption>
    </figure>
  return (
    <li className="beer-card" ref={container}>
      <p>{beer.brewery}</p>
      <p>{beer.style}</p>
      <p>{beer.abv}</p>
      <p>{beer.price}</p>
      <button value={beer.id} onClick={handleDelete}>🗑️</button>
    </li>
    );
};
  return (
    <section>
      <div className="allContainers" style={styles}>
        <div className="list-split">
          {BeerItemCard}
        </div>
      </div>
    </section>
  )
};
