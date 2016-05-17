'use strict';

import React from 'react';
const { PropTypes } = React;
import AppHeader from '../_components/app_header';

class IntroBase extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className="view intro-view">
        <AppHeader/>
        {this.props.children}
      </div>
    );
  }
}

module.exports = IntroBase;

// {this.props.children}
