'use strict';

import React from 'react';

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
