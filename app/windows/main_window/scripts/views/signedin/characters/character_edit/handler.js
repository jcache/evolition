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
      <div>
        <h2>Edit your Character {this.state.character.id}</h2>
      </div>
    );
  }
}

module.exports = CharacterEdit;
