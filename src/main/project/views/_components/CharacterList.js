import React, { Component } from 'react'
import { connect } from 'react-redux';
import CharacterItem from './CharacterItem';
import {
  LoadCharacters
} from '../../actions/characterActions';

function CharacterList(props) {
  let {characters} = props
  return (
    <div className={`character-list`}>
      {characters.map(c => (
        <CharacterItem key={c.id} />
      ))}
    </div>
  )
}


export default connect(LoadCharacters)(CharacterList)
