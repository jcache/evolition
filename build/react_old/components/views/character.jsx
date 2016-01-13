"use strict";

import React from 'react';
import evApplicationStore from '../../stores/ev-app-store.jsx';
import {changeView,focusedCharacter,removeCharacter,selectedCharacter} from '../../actions/ev-actions.jsx';

class Character extends React.Component {
  constructor(props){
    super(props);
    this._onChange = this._onChange.bind(this);
    this._viewCharacter = this._viewCharacter.bind(this);
    this._editCharacter = this._editCharacter.bind(this);

    this.removeCharacter = this.removeCharacter.bind(this);
    this._selectCharacter = this._selectCharacter.bind(this);

    this.state = {
      selected: evApplicationStore.getSelectedView(),
      selected_character: evApplicationStore.getSelectedCharacter()
    };
  }


  componentWillMount(){
    evApplicationStore.addChangeListener(this._onChange);
  }

  componentDidMount(){
    $('#character-list').perfectScrollbar();
  }

  componentWillUnmount(){
    evApplicationStore.removeChangeListener(this._onChange);
  }

  _onChange(){
    this.state = {
      selected: evApplicationStore.getSelectedView(),
      selected_character: evApplicationStore.getTheSelectedCharacter()
    };
  }

  _viewCharacter(e){
    e.preventDefault();
    changeView(e.target.getAttribute("data-view"));
    focusedCharacter(this.state.character);
  }

  removeCharacter() {
    removeCharacter(this.state.character);
  }

  _selectCharacter(){
    console.log(this);
    selectedCharacter(this.props.character);
  }

  _editCharacter(e){
    e.preventDefault();
    changeView(e.target.getAttribute("data-view"));
    focusedCharacter(this.props.character);
  }

  delCharacter(e){
    e.preventDefault();
  }

  render(){
    console.log("render props: ", this.props)
    var active_character = "";
    var show_option = "";
    var character = this.props.character;

    if(typeof this.state.selected_character === 'undefined'){
      show_option = {display:'none'};
      active_character = "";
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
      <li className={active_character} onClick={this._selectCharacter.bind(this, item)}>
        <div className='character-details'>
          <div className='image-box'>
            <div className='image'>
              <img src='../images/darth.png' width='50' height='50'/>
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
              <a href='#' onClick={e => this._viewCharacter.bind(e)} data-view='character_view'>view</a>
            </li>
            <li className='change'>
              <a href='#' onClick={this._editCharacter.bind(this)} data-view='character_edit'>change</a>
            </li>
            <li className='remove'>
              <a href='#' onClick={this.removeCharacter.bind(this)}  data-view='character_edit'>remove</a>
            </li>
          </ul>
        </div>
      </li>
    );
  }
};

module.exports = Character
