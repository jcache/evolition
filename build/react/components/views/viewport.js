"use strict";

var React               = require('react');
var DefaultView         = require('default-view.jsx');
var CharacterForm       = require('character-form.jsx');
var CharacterView       = require('character-view.jsx');
var CharacterAdd        = require('character-add.jsx');
var CharacterEdit       = require('character-edit.jsx');

var evApplicationStore = require('../../stores/ev-app-store.jsx');
var evActions = require('../../actions/ev-actions.jsx');

var Viewport = React.createClass({displayName: "Viewport",

  getInitialState: function(){
    return {
      selected: evApplicationStore.getSelectedView()
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
      selected: evApplicationStore.getSelectedView()
    })
  },

  render: function(){
    let view;
    // console.log(evApplicationStore.getSelectedView());
    switch (this.state.selected) {
      case "default":
        view = React.createElement(DefaultView, null)
        break;
      case "character_form":
        view = React.createElement(CharacterForm, null)
        break;
      case "character_edit":
        view = React.createElement(CharacterEdit, null)
        break;
      case "character_view":
        view = React.createElement(CharacterView, null)
        break;
      case "character_add":
        view = React.createElement(CharacterAdd, null)
        break;
      default:

    }
    return (
      React.createElement("div", {className: "col-xs-8", id: "viewport"}, 
        view
      )
    )
  }
});

module.exports = Viewport
