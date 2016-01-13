"use strict";

var React       = require('react');
var evApplicationStore = require('../../stores/ev-app-store.jsx');
var evActions = require('../../actions/ev-actions.jsx');

var Intro = React.createClass({displayName: "Intro",
  render: function(){
    return (
      React.createElement("div", {className: "row", id: "introduction-view"}, 
        React.createElement("div", {className: "col-xs-12"}, 
          React.createElement("h1", null, "Welcome"), 
          React.createElement("p", null, "This is some cool stuff")
        )
      )
    )
  }
});

module.exports = Intro
