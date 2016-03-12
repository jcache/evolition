import React from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CharacterActions from '../../actions/character-actions.jsx';
import CharacterStore from '../../stores/character-store.jsx';


class Character extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected_character: CharacterStore.getSelectedCharacter()
    }
    this._viewCharacter = this._viewCharacter.bind(this);
    this._editCharacter = this._editCharacter.bind(this);
    this._removeCharacter = this._removeCharacter.bind(this);
    this._onChange = this._onChange.bind(this);
  }


  componentWillMount() {
    CharacterStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    CharacterStore.removeChangeListener(this._onChange);
  }

  _selectCharacter(character) {
    CharacterActions.selectCharacter(character);
  }

  _viewCharacter(e) {
    e.preventDefault();
    CharacterActions.changeView(e.target.getAttribute("data-view"));
    CharacterActions.viewCharacter(this.props.character);
  }

  _editCharacter(e) {
    e.preventDefault();
    CharacterActions.changeView(e.target.getAttribute("data-view"));
  }

  _removeCharacter() {
    CharacterActions.removeCharacter(this.props.character);
  }

  _onChange() {
    this.setState({
      selected_character: CharacterStore.getSelectedCharacter()
    });
  }

  render() {
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
              <img src={character.profile_pic} width='65' />
            </div>
          </div>
          <div className='detail-box'>
            <div className='details'>
              <p className='ch-gamesystem'>{character.game_system_name}</p>
              <h5 className='ch-charactername'>{character.character_name}</h5>
              <p className='ch-profession'>{character.profession ? character.profession : 'undefined'} </p>
              <p className='ch-campaign'>{character.campaign_name ? character.campaign_name : 'undefined'}</p>
              <div className='level-box'>
                <p>
                  <small>Level</small>
                  <span>10</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
module.exports = Character
