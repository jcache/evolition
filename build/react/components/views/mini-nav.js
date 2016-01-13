"use strict";

var React = require('react');
var evApplicationStore = require('../../stores/ev-app-store.jsx');
var evActions = require('../../actions/ev-actions.jsx');


var MiniNav = React.createClass({displayName: "MiniNav",

  getInitialState: function(){
    return {
      views: ev_characters.object.views,
      selected: evApplicationStore.getSelectedView()
    }
  },

  componentWillMount: function(){
    evApplicationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    evApplicationStore.removeChangeListener(this._onChange);
  },

  changeView: function(e){
    e.preventDefault();
    evActions.changeView(e.target.getAttribute("data-view"));
  },

  _onChange: function(){
    this.setState({
      views: ev_characters.object.views,
      selected: evApplicationStore.getSelectedView()
    })
  },

  render: function(){
    return (
      React.createElement("div", {className: "col-xs-1", id: "mini-nav"}, 
        React.createElement("ul", null, 
          React.createElement("li", null, 
            React.createElement("a", {href: "#", className: "characters-link", onClick: this.changeView, "data-view": "default"})
          ), 
          React.createElement("li", null, 
            React.createElement("a", {href: "#", className: "character-add-link", onClick: this.changeView, "data-view": "character_add"})
          )
        )
      )
    )
  }
});

module.exports = MiniNav
