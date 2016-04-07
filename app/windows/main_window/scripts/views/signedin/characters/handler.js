'use strict';

const React     = require('react');
const evActions = require('../../../_actions/actions.js');
const evStore = require('../../../_stores/evStore.js');
const CharacterListItem  = require('./character-list-item');

class Characters extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      characters: evStore.getCharacters(),
      character: evStore.getSelectedCharacter(),
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
      character: evStore.getSelectedCharacter(),
    });
  }

  render () {
    var characters = this.state.characters;
    var character = this.state.character;
    var characterList = [];

    let { pathname } = this.props.location;

    const listViewReveal = pathname == '/signedin/characters'
      ? 'app-listview hidden'
      : 'app-listview shown';

    characters.forEach(function (c) {
      characterList.push(
        <CharacterListItem key={c.id} character={c} selected_character={ character}/>
      );
    });

    return (
      <div className='app-multi-col'>
        <div className={listViewReveal}>
          <div className='app-character-list'>
            <ul>{characterList}</ul>
          </div>
        </div>

        <div className='app-main-view'>
          {this.props.children}
        </div>
      </div>
    );
  }
};

module.exports = Characters;
