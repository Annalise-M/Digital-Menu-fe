import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenus, removeMenu } from '../../actions/menuActions';
import { selectMenus } from '../../selectors/menuSelectors';
import DraggableGrid from './DraggableGrid';

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
    <div key={menu.id} className="grid-item">
      <p>{menu.item}</p>
      <p>{menu.detail}</p>
      <p>{menu.price}</p>
      <button value={menu.id} onClick={handleDelete}>🗑️</button>
    </div>
  ));

  return (
    <div data-testid="menus">
      <DraggableGrid>
        {menuElements}
      </DraggableGrid>
    </div>
  );
};

export default MenuList;
