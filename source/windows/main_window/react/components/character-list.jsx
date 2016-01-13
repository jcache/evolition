import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Character from './elements/character.jsx';

// DEFINE STORE
var list_data = []
list_data.push({"id": 1,"character_name": "A"})
list_data.push({"id": 2,"character_name": "B"})
list_data.push({"id": 3,"character_name": "C"})

// DEFINE STORE
var CharacterList = React.createClass({
  getInitialState: function(){
    return {
      list: list_data
    }
  },
  _onChange: function(){
    this.state = {
      list: list_data
    }
  },
  render: function(){
    // SETS CHARACTERS
    var list = [];
    var characters = this.state.list
    // CREATES DOM NODES
    for (var character in characters) {
      list.push(<Character key={character} character={character} />);
    }
    // RETURN LIST
    return (
      <div className='col-xs-3' id='character-list'>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
}); 

module.exports = CharacterList
