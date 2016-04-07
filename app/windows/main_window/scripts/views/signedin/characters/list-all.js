'use strict';

const React     = require('react');
const evActions = require('../../../_actions/actions.js');
const evStore = require('../../../_stores/evStore.js');
const CharacterListItem  = require('./character-list-item');

class AllCharacters extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      characters: evStore.getCharacters(),
      selected_character_id: evStore.getSelectedCharacter(),
    };

    this._onChange = this._onChange.bind(this);
    this._onSelectCharacter = this._onSelectCharacter.bind(this);
  }

  componentDidMount () {
    $('.app-listview').perfectScrollbar();
  }

  componentWillMount () {
    evStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    evStore.removeChangeListener(this._onChange);
  }

  _onSelectCharacter (id) {
    evActions.setSelectedCharacter(id);
  }

  _onChange () {
    this.setState({
      characters: evStore.getCharacters(),
      selected_character_id: evStore.getSelectedCharacter(),
    });
  }

  render () {
    var characters = this.state.characters;

    return (
      <div className='app-multi-col'>
        <div className='app-main-view all-characters'>
          <h1>All Characters View</h1>
          <p>This is where I'm going to list all of the available characters and other data</p>
          <p>you have {characters.length} characters</p>
        </div>
      </div>
    );
  }
};

module.exports = AllCharacters;
