'use strict';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import reducer from './reducers';
import configureStore from './store/configureStore';

// DEVTOOLS
const devMode = process.env.NODE_ENV === 'development';
let preDevTools;
if (devMode) preDevTools = require('./containers/DevTools');
const DevTools = preDevTools.default;

// CONFIGURE STORE
const store = configureStore();
var history = syncHistoryWithStore(hashHistory, store);

class App extends React.Component {
  render () {
    if(devMode) {
      var devComponent = <DevTools store={store}/>;
    }
    return (
      <div className={`app-wrapper`}>
        <Provider store={store}>
          <Router history={history}>
            {require('./views')}
          </Router>
        </Provider>
        {devComponent}
      </div>
    );
  }
}

module.exports = App;
