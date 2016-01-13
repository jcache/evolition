"use strict";

import React from 'react';
import evApplicationStore from '../../stores/ev-app-store.jsx';
import evActions from '../../actions/ev-actions.jsx';
import Character from './character.jsx';

class CharacterList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      character_list: ev_characters.object.characters,
      selected:false
    };
  }
  componentWillMount(){
    evApplicationStore.addChangeListener(this._onChange);
  }
  componentWillUnmount(){
    evApplicationStore.addChangeListener(this._onChange);
  }
  _onChange(){
    this.state = {
      character_list: evApplicationStore.getAllCharacters(),
      selected:true
    }
  }
  render(){
    const characters = this.state.character_list;
    console.log("getting new characters: ", characters);
    const character_list = [];

    for (var key in characters) {
      character_list.push(<Character key={key} character={characters[key]} />);
    }

    return(
      <div className='col-xs-3' id='character-list'>
        <ul>
          {character_list}
        </ul>
      </div>
    )
  }
}

module.exports = CharacterList
