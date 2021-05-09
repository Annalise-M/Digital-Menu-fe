const fetch = require('node-fetch');

export const getMenus = () => {
  return fetch(`process.env.DATABASE_URL`)
    .then(res => res.json())
    .then(menus => menus.map(menu => ({
      id: menu.id,
      item: menu.item, 
      detail: menu.detail,
      price: menu.price
    })));
};
