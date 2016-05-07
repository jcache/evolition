'use strict';
import React from 'react';
const { PropTypes } = React;
class AuthBase extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className="view">
        {this.props.children}
      </div>
    );
  }
}
module.exports = AuthBase;

// {this.props.children}
