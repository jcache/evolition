import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Character from './elements/character.jsx';
import CharacterStore from '../stores/character-store.jsx';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
var Input     = FRC.Input;
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
    $('.list').perfectScrollbar();
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
    var list = [];
    if (this.state.characters) {
      this.state.characters.forEach(function(character) {
        list.push(<Character key={character.id} character={character} />);
      });
    } else {
      <li className='no-data'>create a character</li>
    };

    return (
      <div className='character-list' id='character-list'>
        <div className='character-search form-group'>

          <input type='search' className='form-control'/>
        </div>
        <div className='list'>
          <ul>
            {list}
          </ul>
        </div>
      </div>
    )
  }
});

module.exports = CharacterList
