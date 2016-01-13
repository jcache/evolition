import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import AddCharacter from './viewports/character.add.jsx';
import EditCharacter from './viewports/character.edit.jsx';
import ViewCharacter from './viewports/character.view.jsx';
import DefaultView from './viewports/default.view.jsx';

let view;

var Viewport = React.createClass({
  getInitialState: function(){
    return {
      view: ''
    }
  },
  render: function(){
    switch (this.state.view) {
      case "default":
        view = <DefaultView />
        break;
      case "character_edit":
        view = <EditCharacter />
        break;
      case "character_view":
        view = <ViewCharacter />
        break;
      case "character_add":
        view = <CharacterAdd />
        break;
      default:
    }
    return (
      <div className='col-xs-8' id='viewport'>
        {view}
      </div>
    )
  }
});

module.exports = Viewport
