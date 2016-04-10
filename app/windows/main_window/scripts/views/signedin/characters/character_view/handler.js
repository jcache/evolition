'use strict';

import React from 'react';
const { PropTypes } = React;
const evStore = require('../../../../_stores/evStore.js');

class CharacterView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      character: evStore.getSelectedCharacter(),
    };
    this._onChange = this._onChange.bind(this);

  }

  componentWillMount () {
    evStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    evStore.removeChangeListener(this._onChange);
  }

  _onChange () {
    this.setState({
      character: evStore.getSelectedCharacter(),
    });
  }

  render () {
    return (
      <div className='bodyHeader'>
        <div className='headTitle'>
          <h2>view your character: {this.state.character.character_name}</h2>
        </div>
        <div className='headController'>
          <ul>
            <li><a href='#'>Edit</a></li>
            <li><a href='#'>View</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

module.exports = CharacterView;
