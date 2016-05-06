'use strict';

import React from 'react';
import { createDevTools } from 'redux-devtools';
import { createHistory } from 'history';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import * as reducers from './_reducers';
const { PropTypes } = React;
import Base from './base';
import Login from './components/login';
import Login2 from './components/login2';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
);

const store = createStore(
  reducer,
  DevTools.instrument()
);

var history = syncHistoryWithStore(hashHistory, store);

class App extends React.Component {
  render () {
    console.log(history);
    return (
      <div>
        <Provider store={store}>
          <Router history={history}>
            <Route path={`/`} component={Base}>
              <IndexRoute component={Login}/>
              <Route path={`login2`} component={Login2}/>
            </Route>
          </Router>
        </Provider>
        <DevTools store={store}/>
      </div>
    );
  }
}

module.exports = App;

// {this.props.children}
