'use strict';

import React from 'react';
const { PropTypes } = React;

class Welcome extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='app-multi-col'>
        <div className='app-main-view welcome'>
          
          <p>I didn't expect to see you here</p>
        </div>
      </div>
    );
  }
}

module.exports = Welcome;
