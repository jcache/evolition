import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Character from './elements/character.jsx';
import Search from './elements/search.jsx';
import CharacterStore from '../stores/character-store.jsx';
import CharacterActions from '../actions/character-actions.jsx';

// DEFINE STORE
var CharacterList = React.createClass({
  getInitialState: function(){
    return{
      characters: CharacterStore.getAllCharacters(),
      search_filter: CharacterStore.getFilteredText() != '' ? CharacterStore.getFilteredText() : '',
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
    CharacterActions.selectedCharacter(character);
  },
  _onChange: function(){
    this.setState({
      characters: CharacterStore.getAllCharacters(),
      search_filter: CharacterStore.getFilteredText() != '' ? CharacterStore.getFilteredText() : '',
    });
  },
  render: function(){
    var list = [];
    var filtered_search = this.state.search_filter;
    if (this.state.characters.length > 0 && this.state.search_filter == '') {
      // RETURNS ALL CHARACTERS NO FILTER
      this.state.characters.forEach(function(character) {
        list.push(<Character key={character.id} character={character} />);
      });
      //
    } else if(this.state.search_filter !== ''){
      // RETURNS ALL CHARACTERS W/ FILTER SPECIFIED
      this.state.characters.forEach(function(character) {
        if(character.character_name.toLowerCase().search(filtered_search.toLowerCase()) == -1) {
          return;
        } else if(character.campaign_name.toLowerCase().search(filtered_search.toLowerCase()) == -1){
        } else {
          list.push(<Character key={character.id} character={character} />);
        }
      });
      //
    } else {
      // RETURNS NO CHARACTERS BECAUSE NO CHARACTERS ARE AVAILABLE
      <li className='no-data'>create a character</li>
      //
    };
    return (
      <div className='character-list' id='character-list'>
        <Search />
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
