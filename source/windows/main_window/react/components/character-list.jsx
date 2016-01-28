import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Character from './elements/character.jsx';
import CharacterStore from '../stores/character-store.jsx';

// DEFINE STORE
var CharacterList = React.createClass({
  getInitialState: function(){
    return{
      characters: CharacterStore.getAllCharacters(),
    }
  },
  componentWillMount: function(){
    CharacterStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    CharacterStore.removeChangeListener(this._onChange);
  },
  componentDidMount: function(){
    $('#character-list').perfectScrollbar();
  },
  selectCharacter: function(character){
    evActions.selectedCharacter(character);
  },
  _onChange: function(){
    this.setState({
      characters: CharacterStore.getAllCharacters(),
    });
  },
  render: function(){
    // SETS CHARACTERS
    var list = [];
    // CREATES DOM NODES
    if (this.state.characters) {
      this.state.characters.forEach(function(character) {
        list.push(<Character key={character.id} character={character} />);
      });
    } else {
      <li className='no-data'>create a character</li>
    };

    // RETURN LIST
    return (
      <div className='flexbox-container character-list' id='character-list'>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
});

module.exports = CharacterList
