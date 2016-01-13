import React from 'react';
import ReactDOM from 'react-dom';
import CharacterOptions from './character-options.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

var Character = React.createClass({
  getInitialState: function(){
    return{
      character: this.props.character
    }
  },

  componentWillMount: function(){
    // evApplicationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    // evApplicationStore.removeChangeListener(this._onChange);
  },
  _selectCharacter: function(){
    console.log(e);
  },
  _onChange: function(){
    this.state = {
      character: this.props.character
    };
  },
  render: function(){

    let active_character
    let show_option = {"display":"none"}
    let character = this.state.character

    return(
      <li className={active_character} onClick={this._selectCharacter}>
        <div className='character-details'>
          <div className='image-box'>
            <div className='image'>
              <img src='../../shared_assets/images/darth.png' width='50' height='50'/>
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
        <CharacterOptions opts={show_option} />
      </li>
    )
  }

});
module.exports = Character
