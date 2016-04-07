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
  }

  render () {
    return (
      <div>
        <h2>view your character: {this.state.character.character_name}</h2>
      </div>
    );
  }
}

module.exports = CharacterView;
