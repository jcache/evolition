'use strict';

import React from 'react';
const { PropTypes } = React;
const evStore = require('../../../../_stores/evStore.js');
import {Link, Route} from 'react-router';

class CharacterView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      character: evStore.getSelectedCharacter(),
    };
    this._onChange = this._onChange.bind(this);
    this._onLaunchSheet = this._onLaunchSheet.bind(this);

  }

  componentWillMount () {
    evStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    evStore.removeChangeListener(this._onChange);
  }

  _onLaunchSheet () {
    alert('launching character sheet...');
  }

  _onChange () {
    this.setState({
      character: evStore.getSelectedCharacter(),
    });
  }

  render () {
    let {character} = this.state;

    return (
      <div className='bodyHeader'>
        <div className='headTitle'>
          <h2>view your character: {character.character_name}</h2>
        </div>
        <div className='headController'>
          <ul>
            <li><Link to={'/signedin/characters/edit/' + character.id} activeClassName='character-add-link' activeClassName='active'>Edit</Link></li>
            <li><a onClick={this._onLaunchSheet} className='character-sheet-link'>Sheet View</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

module.exports = CharacterView;
