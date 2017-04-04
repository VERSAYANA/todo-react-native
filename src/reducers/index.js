import { combineReducers } from 'redux';
// import todos from "./todos";
// import lists from "./lists";
import filter from './filter';
import userId from './userId';

const index = combineReducers({
  // todos,
  // lists,
  filter,
	userId,
});

export default index;
