"use strict";

var React       = require('react');
var evApplicationStore = require('ev-app-store');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var evApplicationStore = require('../../stores/ev-app-store.jsx');
var evActions = require('../../actions/ev-actions.jsx');

var CharacterView = React.createClass({displayName: "CharacterView",
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
      React.createElement(ReactCSSTransitionGroup, {transitionName: "example", transitionAppear: true, transitionAppearTimeout: 500, transitionEnterTimeout: 300, transitionLeaveTimeout: 500}, 
        React.createElement("div", {className: "row view-handler", id: "introduction-view"}, 
          React.createElement("div", {className: "col-xs-12"}, 
            React.createElement("h1", null, this.state.character.character_name), 
            React.createElement("p", null, "Game System: ", this.state.character.game_system_name), 
            React.createElement("p", null, "Campaign: ", this.state.character.campaign_name), 
            React.createElement("p", null, "Level: ", this.state.character.level)
          )
        )
      )
    )
  }
});

module.exports = CharacterView
