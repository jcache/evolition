'use strict';

const React     = require('react');
const evActions = require('../../../../_actions/actions.js');
import { browserHistory } from 'react-router';

class CharacterListItem extends React.Component {
  constructor (props) {
    super(props);
    this._onSelectCharacter = this._onSelectCharacter.bind(this);
  }

  _onSelectCharacter (item) {
    evActions.setSelectedCharacter(item);
    browserHistory.push('/signedin/characters/view/' + item.id);
  }

  render () {
    let {character, selected_character} = this.props
    var image_src = 'ev://shared/images/darths.png';
    return (
      <div
        className='character-card'>

      </div>
    );
  }
};

module.exports = CharacterListItem;
