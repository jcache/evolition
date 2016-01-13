"use strict";

var React       = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var evApplicationStore = require('../../stores/ev-app-store.jsx');
var evActions = require('../../actions/ev-actions.jsx');

var DefaultView = React.createClass({displayName: "DefaultView",
  render: function(){
    return (
      React.createElement("div", {className: "row", id: "introduction-view"}, 
        React.createElement(ReactCSSTransitionGroup, {transitionName: "example", transitionAppear: true, transitionAppearTimeout: 500, transitionEnterTimeout: 300, transitionLeaveTimeout: 500}, 
          React.createElement("div", {className: "col-xs-12"}, 
            React.createElement("h1", null, "Default View"), 
            React.createElement("p", null, "This is some cool stuff")
          )
        )
      )
    )
  }
});

module.exports = DefaultView
