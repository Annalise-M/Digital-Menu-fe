import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenus, removeMenu } from '../../actions/menuActions';
import { selectMenus } from '../../selectors/menuSelectors';

import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(CSSPlugin);
gsap.registerPlugin(Draggable);


const MenuList = () => {
  const menus = useSelector(selectMenus);
  const dispatch = useDispatch();
  const menuCard = React.createRef();
  // const container = React.createRef();

  useEffect(() => {
    dispatch(fetchMenus());
  }, []);

  // useEffect(() => {
  //   Draggable.create('.menuCard', {
  //     bounds: container,
  //     type: 'x, y'
  //   });
  // }, [])

  const handleDelete = ({ target }) => {
    dispatch(removeMenu(target.value));
  };

  const menuElements = menus.map(menu => (
      <li key={menu.id} ref={menuCard} id="menuCard">
        <p>{menu.item}</p>
        <p>{menu.detail}</p>
        <p>{menu.price}</p>
        <button value={menu.id} onClick={handleDelete}>🗑️</button>
      </li>
  ));

  return (
    <ul data-testid="menus">
      {menuElements}
    </ul>
  );
};

export default MenuList;
