'use strict';

import React from 'react';
const { PropTypes } = React;
const evStore   = require('../../../../_stores/evStore.js');
const evActions = require('../../../../_actions/actions.js');
import {Link, Route} from 'react-router';

class CharacterView extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      character: evStore.getSelectedCharacter(),
    };

    this._onChange          = this._onChange.bind(this);
    this._onLaunchSheet     = this._onLaunchSheet.bind(this);
    this._onDeleteCharacter = this._onDeleteCharacter.bind(this);

  }

  componentWillMount () {
    evStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    evStore.removeChangeListener(this._onChange);
  }

  _onDeleteCharacter () {
    let {character} = this.state;
    evActions.deleteCharacter(character);
  }

  _onLaunchSheet () {
    ipc.send('open_character_sheet');
  }

  _onChange () {
    this.setState({
      character: evStore.getSelectedCharacter(),
    });
  }

  render () {
    let {character} = this.state;

    return (
      <div className='app-main-view'>
        <div className='bodyHeader'>
          <div className='headTitle'>
            <h2>view your character: {character.character_name}</h2>
          </div>
          <div className='headController'>
            <ul>
              <li><Link to={'/signedin/characters/edit/' + character.id} className='btn btn-raised btn-primary' activeClassName='active'>Edit</Link></li>
              <li><a onClick={this._onLaunchSheet} className='btn btn-raised btn-primary'>Sheet View</a></li>
              <li><a onClick={this._onDeleteCharacter} className='btn btn-raised btn-danger'>Delete</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = CharacterView;
