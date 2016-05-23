import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import count from './count'
import view from './view'
import character from './character'

const reducer = combineReducers({
  count,
  view,
  character,
  routing: routerReducer });

export default reducer
