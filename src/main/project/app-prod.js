import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import * as reducers from './reducers';
const reducer = combineReducers({ ...reducers, routing: routerReducer });
const store = createStore(reducer);

var history = syncHistoryWithStore(hashHistory, store);

class App extends React.Component {
  render () {
    return (
      <div className={`app-wrapper`}>
        <Provider store={store}>
          <Router history={history}>
            {require('./views')}
          </Router>
        </Provider>
      </div>
    );
  }
}

module.exports = App;
