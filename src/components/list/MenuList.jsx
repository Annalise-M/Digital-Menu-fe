import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenus, removeMenu } from '../../actions/menuActions';
import { selectMenus } from '../../selectors/menuSelectors';
// import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import styles from './menuList.scss';

// gsap.registerPlugin(CSSPlugin);
// gsap.registerPlugin(Draggable);


const MenuList = () => {
  const menus = useSelector(selectMenus);
  const dispatch = useDispatch();
  const container = React.createRef();
  const menuElements = useRef([]);


  useEffect(() => {
    dispatch(fetchMenus());
  }, []);

  // animated effect
  useEffect(() => {
    Draggable.create('#menuElements', {
      bounds: container,
      type: 'x, y'
    });
  }, [])

  const handleDelete = ({ target }) => {
    dispatch(removeMenu(target.value));
  };

//   const menuElements = [menus].map(menu => (
//     <div key={menu.id} id="drag" className="draggable" ref={draggable}>
//       {/* <div> */}
//         <p>{menu.item}</p>
//         <p>{menu.detail}</p>
//         <p>{menu.price}</p>
//         <button value={menu.id} onClick={handleDelete}>🗑️</button>
//       {/* </div> */}
//     </div>
//   ),
// );



  return (
    <div style={styles}>
        <div data-testid="menus" className="container" id="container" ref={container}>
          {menus.map((menu) => {
            const getRef = (el) => (menuElements.current.push(el))
            return (
            <div key={menu.id} ref={getRef} id="drag">
            <p>{menu.item}</p>
            <p>{menu.detail}</p>
            <p>{menu.price}</p>
            <button value={menu.id} onClick={handleDelete}>🗑️</button>
          </div>
          )})}
{/*         
      {console.log(menu.id, menu.ref, 'balifnlisenlsien')} */}
      </div>
    </div>
  );
};

export default MenuList;
