'use strict';

import React from 'react';
import Anon from './views/anon/handler.js';
import SignedIn from './views/signedin/handler.js';
import evActions from './_actions/actions.js';
import evStore from './_stores/evStore.js';
const { PropTypes } = React;
const AppFooter  = require('./components/app-footer');

class Base extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="app">
        {this.props.children}
      </div>
    );
  }
}

module.exports = Base;
