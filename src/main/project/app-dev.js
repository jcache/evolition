import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import * as reducers from './_reducers';

import Base from './base';
import AuthBase from './views/Auth/_base';
import Login from './views/Auth/login';

const reducer = combineReducers({ ...reducers, routing: routerReducer });

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible={false}>
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
);

const store = createStore(
  reducer,
  DevTools.instrument()
);

var history = syncHistoryWithStore(hashHistory, store);

class AppDev extends React.Component {
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
        <DevTools store={store}/>
      </div>
    );
  }
}

module.exports = AppDev;
// <DevTools store={store}/>

// {this.props.children}
