import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import view from './view'

const reducers = combineReducers({
  routing: routerReducer ,
  view
});

export default reducers
