'use strict';

import React from 'react';
const { PropTypes } = React;
import AppHeader from '../_components/app_header';
import AppLeftNav from '../_components/app_left_nav';
class CharacterBase extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className="view character-view">
        <AppHeader/>
        <div className='app-body-container'>
          <AppLeftNav/>
          {this.props.children}
        </div>
      </div>
    );
  }
}

module.exports = CharacterBase;

// {this.props.children}
