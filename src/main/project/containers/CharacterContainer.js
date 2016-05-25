'use strict';

import React from 'react';
const { PropTypes } = React;
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as actions from '../actions/characterActions';
import AppHeader from '../views/_components/app_header';
import AppLeftNav from '../views/_components/app_left_nav';

export default class CharacterContainer extends React.Component {
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
