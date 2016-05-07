'use strict';

import React from 'react';
const { PropTypes } = React;
import AppHeader from '../_components/app_header';

class DashboardBase extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className="view dashboard-view">
        <AppHeader/>
        {this.props.children}
      </div>
    );
  }
}

module.exports = DashboardBase;

// {this.props.children}
