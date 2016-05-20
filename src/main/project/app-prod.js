import React from 'react';



import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import * as reducers from './_reducers';

import Base from './base';
import AuthBase from './views/Auth/_base';
import Login from './views/Auth/login';

const reducer = combineReducers({ ...reducers, routing: routerReducer });



const store = createStore(
  reducer,
);

var history = syncHistoryWithStore(hashHistory, store);

class AppProd extends React.Component {
  render () {
    return (
      <div className={`app-wrapper`}>
        <Provider store={store}>
          <Router history={history}>
            <Route path={`/`} component={Base}>
              {require('./views/Auth/_routes')}
              {require('./views/Characters/_routes')}
              {require('./views/Dashboard/_routes')}
              {require('./views/Intro/_routes')}
            </Route>
          </Router>
        </Provider>
      </div>
    );
  }
}

module.exports = AppProd;
// <DevTools store={store}/>

// {this.props.children}
