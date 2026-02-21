import React, { useState } from 'react';
import { useMenus, useDeleteMenu } from '../../hooks/useMenus';
import DraggableGrid from './DraggableGrid';

const MenuList = () => {
  const { data: menus = [], isLoading, error } = useMenus();
  const deleteMenu = useDeleteMenu();
  const [strikethroughItems, setStrikethroughItems] = useState({});

  const handleDelete = ({ target }) => {
    deleteMenu.mutate(target.value);
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

  if (isLoading) return <div className="menu-list-container"><h2>Loading menus...</h2></div>;
  if (error) return <div className="menu-list-container"><h2>Error loading menus: {error.message}</h2></div>;

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
