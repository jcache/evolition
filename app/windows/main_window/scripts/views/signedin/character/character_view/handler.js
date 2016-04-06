'use strict';

import React from 'react';
const { PropTypes } = React;

class CharacterView extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <h2>view your character</h2>
      </div>
    );
  }
}

module.exports = CharacterView;
