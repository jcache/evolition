import React from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
var CharacterActions  = require('../../actions/character-actions.jsx');
var CharacterStore  = require('../../stores/character-store.jsx');

var Character = React.createClass({
  getInitialState: function(character){
    return {
      selected_character: CharacterStore.getSelectedCharacter()
    }
  },
  componentWillMount: function(){
    CharacterStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    CharacterStore.removeChangeListener(this._onChange);
  },
  _selectCharacter: function(character){
    CharacterActions.selectCharacter(character);
  },
  _viewCharacter: function(e){
    e.preventDefault();
    CharacterActions.changeView(e.target.getAttribute("data-view"));
    CharacterActions.viewCharacter(this.props.character);
  },
  _editCharacter: function(e){
    e.preventDefault();
    CharacterActions.changeView(e.target.getAttribute("data-view"));
  },
  _removeCharacter: function() {
    CharacterActions.removeCharacter(this.props.character);
  },
  _onChange: function(){
    this.setState({
      selected_character: CharacterStore.getSelectedCharacter()
    });
  },
  render: function(){
    var active_character = "";
    var show_option = {};
    var character = this.props.character;

    if(typeof this.state.selected_character === 'undefined'){
      show_option = {display:'none'};
      active_character = "inactive";
    } else {
      if (this.props.character.id == this.state.selected_character.id){
        show_option = {display:'block'};
        active_character = "active";
      } else {
        show_option = {display:'none'};
        active_character = "";
      }
    }

    return(
      <li className={active_character} onClick={this._selectCharacter.bind(this,character)}>
        <div className='character-details'>
          <div className='image-box'>
            <div className='image'>
              <img src={character.profile_pic} width='50' height='50'/>
            </div>
          </div>
          <div className='detail-box'>
            <div className='details'>
              <h5>{character.character_name}</h5>
              <p><small>{character.game_system_name}<strong> ({character.campaign_name ? character.campaign_name : 'undefined'}) </strong></small></p>
              <p>lvl: {character.level ? character.level : 'undefined'} </p>
            </div>
          </div>
        </div>
        <div className='character-options' style={show_option}>
          <ul>
            <li className='view'>
              <a href='#' onClick={this._viewCharacter} data-view='character_view'>view</a>
            </li>
            <li className='change'>
              <a href='#' onClick={this._editCharacter} data-view='character_edit'>change</a>
            </li>
            <li className='remove'>
              <a href='#' onClick={this._removeCharacter}  data-view='character_edit'>remove</a>
            </li>
          </ul>
        </div>
      </li>
    )
  }

});
module.exports = Character
