import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenus, removeMenu } from '../../actions/menuActions';
import { selectMenus } from '../../selectors/menuSelectors';

const MenuList = () => {
  const menus = useSelector(selectMenus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMenus());
  }, []);

  const handleDelete = ({ target }) => {
    dispatch(removeMenu(target.value));
  };

  const menuElements = menus.map(menu => (
    <li key={menu.id}>
      <p>{menu.item}</p>
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
