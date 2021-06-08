import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import beerReducer from './beerReducer';

export default combineReducers({
  menu: menuReducer,
  beer: beerReducer
});
