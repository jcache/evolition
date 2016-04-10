'use strict';

const React     = require('react');
const evActions = require('../../../_actions/actions.js');

class CharacterListItem extends React.Component {
  constructor (props) {
    super(props);
    this._onSelectCharacter = this._onSelectCharacter.bind(this);
  }

  _onSelectCharacter (item) {
    evActions.setSelectedCharacter(item);
  }

  render () {
    var c = this.props.character;
    var selectedCharacter = this.props.selected_character;
    var image_src = 'ev://shared/images/darths.png';
    return (
      <li className={c.id == selectedCharacter.id ? "active" : "inactive"} onClick={this._onSelectCharacter.bind(this, c )}>
        <div className='character-details'>
          <div className='image-box'>
            <div className='image'>
              <img src={image_src} width='65' />
            </div>
          </div>
          <div className='detail-box'>
            <div className='details'>
              <p className='ch-gamesystem'>{c.game_system_name}</p>
              <h5 className='ch-charactername'>{c.character_name}</h5>
              <p className='ch-profession'>{c.profession ? c.profession : 'undefined'} </p>
              <p className='ch-campaign'>{c.campaign_name ? c.campaign_name : 'undefined'}</p>
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

    );
  }
};

module.exports = CharacterListItem;
