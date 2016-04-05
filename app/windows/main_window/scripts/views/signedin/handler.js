'use strict';

const React = require('react');
const evActions = require('../../_actions/actions.js');
const evStore  = require('../../_stores/evStore');
const CharacterListItem  = require('./character/character-list-item');
const AppHeader  = require('../../components/app-header');
const AppFooter  = require('../../components/app-footer');
import {Link} from 'react-router';

class SignedIn extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      shown: evStore.getLoginShown(),
      characters: evStore.getCharacters(),
      selected_character_id: evStore.getSelectedCharacter(),

    };
    this._onChange = this._onChange.bind(this);
    this._onAppCTRL = this._onAppCTRL.bind(this);

  }

  componentDidMount () {
    // var height = $('.app-listview').height();
    // console.log(height);
    // $('.app-character-list').height(height);
    $('.app-listview').perfectScrollbar();
  }

  componentWillMount () {
    evStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    evStore.removeChangeListener(this._onChange);
  }

  _onChange () {
    this.setState({
      shown: evStore.getLoginShown(),
      characters: evStore.getCharacters(),
      selected_character_id: evStore.getSelectedCharacter(),
    });
  }

  _onAppCTRL (cmd, bool) {
    if (cmd == 'resize-to-login') {
      evActions.showLogin(true);
    }

    ipc.send(cmd);
  }

  _onChangeView (cmd) {
    evActions.changeView(cmd);
  }

  render () {
    var characters = this.state.characters;
    var selected_character_id = this.state.selected_character_id;
    var character_list = []
    characters.forEach(function (c) {
      character_list.push(<CharacterListItem key={c.id} character={c} selected_character={selected_character_id}/>);
    });
    return (
      <div className='signedin-view'>
        <AppHeader />
        <div className='app-body-container'>
          <div className='app-left-nav'>
            <ul>
              <li><Link to="/signedin/1" onClick={this._onChangeView.bind(this, 'default-view')} activeClassName='characters-link'></Link></li>
              <li><Link to="/signedin/2" onClick={this._onChangeView.bind(this, 'character-add')} activeClassName='character-add-link'></Link></li>
              <li><Link to="/signedin/3" onClick={this._onChangeView.bind(this, 'fake_page_1')} activeClassName='character-add-link'></Link></li>
              <li><Link to="/signedin/4" onClick={this._onChangeView.bind(this, 'fake_page_2')} activeClassName='character-add-link'></Link></li>
            </ul>
          </div>

          <div className='app-listview '>
            <div className='app-character-list'>
              <ul>{character_list}</ul>
            </div>
          </div>
          <div className='app-main-view'>
            ...
          </div>
        </div>
        <AppFooter />
      </div>
    );
  }
};

module.exports = SignedIn;
