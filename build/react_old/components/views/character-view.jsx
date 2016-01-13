"use strict";

var React       = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

import evApplicationStore from '../../stores/ev-app-store.jsx';
import evActions from '../../actions/ev-actions.jsx';

var CharacterView = React.createClass({
  getInitialState: function(){
    return {
      character:  evApplicationStore.getSelectedCharacter()
    }
  },
  componentWillMount: function(){
    evApplicationStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    evApplicationStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState({
      character: evApplicationStore.getSelectedCharacter()
    })
  },
  render: function(){
    let msg;
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      msg = "Great success! All the File APIs are supported."
    } else {
      msg = 'The File APIs are not fully supported in this browser.';
    }
    return (
      <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={300} transitionLeaveTimeout={500}>
        <div className='row view-handler' id='introduction-view'>
          <div className='col-xs-12'>
            <h1>{this.state.character.character_name}</h1>
            <p>Game System: {this.state.character.game_system_name}</p>
            <p>Campaign: {this.state.character.campaign_name}</p>
            <p>Level: {this.state.character.level}</p>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
});

module.exports = CharacterView
