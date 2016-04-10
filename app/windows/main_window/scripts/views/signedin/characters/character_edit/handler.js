'use strict';

import React from 'react';
const { PropTypes } = React;
const evStore = require('../../../../_stores/evStore.js');

class CharacterEdit extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      character: evStore.getSelectedCharacter(),
    };
  }

  render () {
    return (
      <div className='bodyHeader'>
        <div className='headTitle'>
          <h2>Edit your Character {this.state.character.id}</h2>
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

module.exports = CharacterEdit;
