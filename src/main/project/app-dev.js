import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import DevTools from './views/_components/devtools';
import reducer from './reducers';

const store = createStore(
  reducer,
  DevTools.instrument()
);

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
        <DevTools store={store}/>
      </div>
    );
  }
}

module.exports = App;
