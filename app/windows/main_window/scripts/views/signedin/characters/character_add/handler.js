'use strict';

import React from 'react';
const { PropTypes } = React;

class CharacterAdd extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='bodyHeader'>
        <div className='headTitle'>
          <h2>Add a new character</h2>
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

module.exports = CharacterAdd;
