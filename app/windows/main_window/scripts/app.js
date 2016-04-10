'use strict';

import React from 'react';
import { render } from 'react-dom';
import routes from './routes';
import { Router, browserHistory } from 'react-router';

class App extends React.Component {
  render () {

    return (
      <Router history={browserHistory}>
        {routes}
      </Router>
    );
  }
};

render(<App />, document.getElementById('evolition'));
