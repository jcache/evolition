import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
var CharacterActions  = require('../actions/character-actions.jsx');
var CharacterStore  = require('../stores/character-store.jsx');

import AddCharacter from './viewports/character.add.jsx';
import EditCharacter from './viewports/character.edit.jsx';
import ViewCharacter from './viewports/character.view.jsx';
import DefaultView from './viewports/default.view.jsx';
import FakePage1 from './viewports/fake.p1.jsx';
import FakePage2 from './viewports/fake.p2.jsx';

let view;

var Viewport = React.createClass({
  getInitialState: function(){
    return {
      selected: ev_characters('selected_view').first(),
      character:  CharacterStore.getSelectedCharacter(),
    }
  },
  componentWillMount: function(){
    CharacterStore.addChangeListener(this._onChange);
  },
  componentDidMount: function(){
    $('.viewz').perfectScrollbar();
  },
  componentWillUnmount: function(){
    CharacterStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState({
      selected: CharacterStore.getSelectedView(),
      character:  CharacterStore.getSelectedCharacter(),
    })
  },
  render: function(){
    switch (this.state.selected.view_name) {
      case "default":
        view = <DefaultView />
        break;
      case "character_edit":
        view = <EditCharacter />
        break;
      case "character_view":
        view = <ViewCharacter character={this.state.character} />
        break;
      case "character_add":
        view = <AddCharacter />
        break;
      case "fake_page_1":
        view = <FakePage1 />
        break;
      case "fake_page_2":
        view = <FakePage2 />
        break;
      default:
    }
    var classes = {

    };
    return (
      <div className={"col-xs-12 viewz"} id='viewport'>
        {view}
      </div>
    )
  }
});

module.exports = Viewport
