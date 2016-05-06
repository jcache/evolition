'use strict';

import React from 'react';
const { PropTypes } = React;

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

// {this.props.children}
