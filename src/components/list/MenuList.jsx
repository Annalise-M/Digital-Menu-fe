import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenus, removeMenu } from '../../actions/menuActions';
import { selectMenus } from '../../selectors/menuSelectors';
import DraggableGrid from './DraggableGrid';

const MenuList = () => {
  const menus = useSelector(selectMenus);
  const dispatch = useDispatch();
  const [strikethroughItems, setStrikethroughItems] = useState({});

  useEffect(() => {
    dispatch(fetchMenus());
  }, []);

  const handleDelete = ({ target }) => {
    dispatch(removeMenu(target.value));
  };

  const handleStrikethrough = (id) => {
    setStrikethroughItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  const menuElements = menus.map(menu => (
    <div key={menu.id} className="grid-item">
      <div className="content-wrapper">
        <div className="toggle-wrapper">
          <input
            type="checkbox"
            className="toggle-button"
            id={`strike-${menu.id}`}
            checked={strikethroughItems[menu.id] || false}
            onChange={() => handleStrikethrough(menu.id)}
          />
          <label htmlFor={`strike-${menu.id}`}>Sold Out</label>
        </div>
        <p className={strikethroughItems[menu.id] ? 'strike-through' : ''}>{menu.item}</p>
        <p className={strikethroughItems[menu.id] ? 'strike-through' : ''}>{menu.detail}</p>
        <p className={strikethroughItems[menu.id] ? 'strike-through' : ''}>${formatPrice(menu.price)}</p>
      </div>
      <button value={menu.id} onClick={handleDelete}>🗑️</button>
    </div>
  ));

  return (
    <div data-testid="menus" className="menu-list-container">
      <h2>Menu Items</h2>
      <DraggableGrid>
        {menuElements}
      </DraggableGrid>
    </div>
  );
};

export default MenuList;
