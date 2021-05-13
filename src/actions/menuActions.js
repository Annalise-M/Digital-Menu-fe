import { deleteMenu, getMenus, postMenu } from '../services/api/menusApi';

export const PREPEND_MENU = 'PREPEND_MENU';
export const prependMenu = menu => ({
  type: PREPEND_MENU,
  payload: menu
});

export const SET_MENUS = 'SET_MENUS';
export const setMenus = menus => ({
  type: SET_MENUS,
  payload: menus
});

export const DELETE_MENU = 'DELETE_MENU';

export const createMenu = menu => dispatch => {
  postMenu(menu)
    .then(createdMenu => {
      dispatch(prependMenu(createdMenu));
    });
};

export const fetchMenus = () => dispatch => {
  getMenus()
    .then(menus => {
      dispatch(setMenus(menus));
    });
};

export const removeMenu = id => dispatch => {
  deleteMenu(id)
    .then(menu => {
      dispatch({
        type: DELETE_MENU,
        payload: menu.id
      });
    });
};

