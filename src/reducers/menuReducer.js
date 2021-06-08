import { DELETE_MENU, PREPEND_MENU, SET_MENUS } from '../actions/menuActions';

const initialState = {
  list: []
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case PREPEND_MENU:
      return { ...state, list: [action.payload, ...state.list] };
    case SET_MENUS:
      return { ...state, list: action.payload };
    case DELETE_MENU:
        return { 
          ...state,
          list: state.list.filter(menu => menu.id !== action.payload) 
        };
      default:
        return state;
  }
};

