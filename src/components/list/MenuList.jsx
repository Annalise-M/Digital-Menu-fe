import React from 'react';
import { useMenus, useDeleteMenu, useUpdateMenu } from '../../hooks/useMenus';
import { useMenuCategories } from '../../hooks/useMenuCategories';
import DraggableGrid from './DraggableGrid';

const MenuList = () => {
  const { data: menus = [], isLoading, error } = useMenus();
  const { data: categories = [] } = useMenuCategories();
  const deleteMenu = useDeleteMenu();
  const updateMenu = useUpdateMenu();

  // Helper function to get category name from ID
  const getCategoryName = (categoryId) => {
    if (!categoryId) return 'Uncategorized';
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  const handleDelete = ({ target }) => {
    deleteMenu.mutate(target.value);
  };

  const handleToggleAvailability = (menu) => {
    updateMenu.mutate({
      id: menu.id,
      item: menu.item,
      detail: menu.detail,
      price: menu.price,
      available: !menu.available,
      categoryId: menu.categoryId
    });
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
            checked={!menu.available}
            onChange={() => handleToggleAvailability(menu)}
          />
          <label htmlFor={`strike-${menu.id}`}>Sold Out</label>
        </div>
        <p className={!menu.available ? 'strike-through' : ''}>{menu.item}</p>
        <p className={!menu.available ? 'strike-through' : ''}>{menu.detail}</p>
        <p className={!menu.available ? 'strike-through' : ''}>${formatPrice(menu.price)}</p>
        <p className="category-label">
          <span className="label-text">Category:</span> {getCategoryName(menu.categoryId)}
        </p>
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
