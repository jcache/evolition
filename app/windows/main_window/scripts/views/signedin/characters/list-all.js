'use strict';

const React     = require('react');
const evActions = require('../../../_actions/actions.js');
const evStore = require('../../../_stores/evStore.js');
const CharacterCard  = require('./_components/character-card');

class AllCharacters extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      characters: evStore.getCharacters(),
      selected_character: evStore.getSelectedCharacter(),
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
      selected_character: evStore.getSelectedCharacter(),
    });
  }

  render () {
    const characterCards = [];
    let {characters, selected_character} = this.state;
    characters.forEach(function (c) {
      characterCards.push(
        <CharacterCard key={c.id} character={c} selected_character={ selected_character}/>
      );
    });
    return (
      <div className='app-multi-col'>
        <div className='app-main-view all-characters'>
          {characterCards}
        </div>
      </div>
    );
  }
};

module.exports = AllCharacters;
