'use strict';

import React from 'react';
import { render } from 'react-dom';
import Base from './base.js';
import evActions from './_actions/actions.js';
import evStore from './_stores/evStore.js';
import routes from './routes';
import { Router, browserHistory } from 'react-router';

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {};
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    evStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    evStore.removeChangeListener(this._onChange);
  }

  _onChange () {
    this.setState({});
  }

  render () {

    return (
      <Router history={browserHistory}>
        {routes}
      </Router>
    );
  }
};

render(<App />, document.getElementById('evolition'));
