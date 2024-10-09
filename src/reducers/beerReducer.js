import { DELETE_BEER, PREPEND_BEER, SET_BEERS } from '../actions/beerActions';

const initialState = {
  list: []
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case PREPEND_BEER:
      return { ...state, list: [action.payload, ...state.list] };
    case SET_BEERS:
      return { ...state, list: action.payload };
    case DELETE_BEER:
        return { 
          ...state,
          list: state.list.filter(beer => beer.id !== action.payload) 
        };
      default:
        return state;
  }
};

