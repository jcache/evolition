'use strict';

import React from 'react';
const { PropTypes } = React;

class Welcome extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <h2>Welcome</h2>
      </div>
    );
  }
}

module.exports = Welcome;
