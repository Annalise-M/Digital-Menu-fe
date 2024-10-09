import React, { createRef } from 'react';
import MenuList from '../list/MenuList';
import BeerList from '../list/BeerList';
import styles from './allLists.scss';

// import { gsap } from 'gsap';
// import { Draggable } from 'gsap/Draggable';

// gsap.registerPlugin(CSSPlugin);
// gsap.registerPlugin(Draggable);

export default function AllForms() {

  // const menuContainer = React.createRef();
  // const card = React.createRef();

  // useEffect(() => {
  //   Draggable.create('.card', {
  //     type: 'y',
  //     bounds: menuContainer,
  //     // type: 'y',
  //     // dragClickables: true,
  //     // bounds: container || 
  //     // {top:0, left:0, width:1000, height:100},
  //     // onRelease: menuElements
  //   });
  // }, [])

  return (
    <section>
      <div className="allContainers" style={styles}>
        <div className="list-split">
          <div>
           <MenuList />
          </div>
          <div className="beer-container">
            <BeerList />
          </div>
        </div>
      </div>
    </section>
  )
};
