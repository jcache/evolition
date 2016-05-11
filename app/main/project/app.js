import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import reducers from './_reducers';
import DevTools from './views/_components/dev_tools';

import Base from './base';
import AuthBase from './views/Auth/_base';
import Login from './views/Auth/login';
// import AuthZones from './views/Auth';


const store = createStore(
  reducers,
  DevTools.instrument()
);

var history = syncHistoryWithStore(hashHistory, store);

class App extends React.Component {
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

module.exports = App;
// <DevTools store={store}/>

// {this.props.children}
