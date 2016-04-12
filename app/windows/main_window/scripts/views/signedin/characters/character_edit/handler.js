'use strict';

import React from 'react';
let { PropTypes } = React;
const evStore = require('../../../../_stores/evStore.js');
import {Link, Route} from 'react-router';

class CharacterEdit extends React.Component {
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
    let {character} = this.state;
    return (
      <div className='bodyHeader'>
        <div className='headTitle'>
          <h2>Edit your Character {character.id}</h2>
        </div>
        <div className='headController'>
          <ul>
            <li><Link to={'/signedin/characters/view/' + character.id} activeClassName='character-view-link' activeClassName='active'>View</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}

module.exports = CharacterEdit;
