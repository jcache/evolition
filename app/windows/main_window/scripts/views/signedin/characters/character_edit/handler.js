'use strict';

import React from 'react';
const { PropTypes } = React;

class CharacterAdd extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <h2>Add a new character</h2>
      </div>
    );
  }
}

module.exports = CharacterAdd;
