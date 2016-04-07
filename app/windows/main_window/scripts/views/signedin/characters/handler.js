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
    var selected_character_id = this.state.selected_character_id;
    var character_list = [];

    let {pathname} = this.props.location;
    console.log(">>>>>>",pathname);
    const listViewReveal = pathname == '/signedin/characters' ? 'app-listview hidden' : 'app-listview shown';

    characters.forEach(function (c) {
      character_list.push(<CharacterListItem key={c.id} character={c} selected_character={selected_character_id}/>);
    });

    return (
      <div className='app-multi-col'>
        <div className={listViewReveal}>
          <div className='app-character-list'>
            <ul>{character_list}</ul>
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
