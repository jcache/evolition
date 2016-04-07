'use strict';

const React = require('react');
const evActions = require('../../../_actions/actions.js');
const evStore  = require('../../../_stores/evStore');

import {Link, Route} from 'react-router';

class AppLeftNav extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      active_nav: evStore.getCharacterView(),
      character: evStore.getSelectedCharacter(),
    };

    this._onChange = this._onChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);

  }

  componentWillMount () {
    evStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    evStore.removeChangeListener(this._onChange);
  }

  _onChangeView (e, cmd) {
    evActions.setCharacterView(cmd);
  }

  _onChange () {
    this.setState({
      active_nav: evStore.getCharacterView(),
      character: evStore.getSelectedCharacter(),
    });
  }

  render () {
    let {pathname} = this.props;
    let {character} = this.state;

    const leftNavClass = pathname == '/signedin/welcome' ? 'app-left-nav hidden' : 'app-left-nav shown'

    return (
      <div className={leftNavClass}>
        <ul>
          <li><Link to="/signedin/characters" onClick={this._onChangeView.bind(this, 'default-view')} activeClassName='characters-link'></Link></li>
          <li><Link to={'/signedin/characters/view/' + character.id} onClick={this._onChangeView.bind(this, 'character-add')} activeClassName='character-add-link'></Link></li>
          <li><Link to={'/signedin/characters/edit/' + character.id} onClick={this._onChangeView.bind(this, 'fake_page_1')} activeClassName='character-edit-link'></Link></li>
          <li><Link to="/signedin" onClick={this._onChangeView.bind(this, 'fake_page_2')} activeClassName='character-add-link'></Link></li>
        </ul>
      </div>
    );
  }
};

module.exports = AppLeftNav;
