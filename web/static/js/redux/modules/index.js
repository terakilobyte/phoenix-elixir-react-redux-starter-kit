import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import tictactoe from './tictactoe';

export default combineReducers({
  tictactoe,
  router: routeReducer
});
