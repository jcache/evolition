"use strict";

var React       = require('react');
var evApplicationStore = require('../../stores/ev-app-store.jsx');
var evActions = require('../../actions/ev-actions.jsx');


var NavBar = React.createClass({displayName: "NavBar",
  handleCloseApp: function(e) {
    ipc.send('close_mainwin');
    e.preventDefault();
  },
  render: function(){
    return (
      React.createElement("nav", {id: "app-nav", className: "navbar navbar-default"}, 
        React.createElement("div", {className: "container-fluid"}, 
          React.createElement("div", {className: "navbar-collapse collapse", id: "navbar"}, 
            React.createElement("ul", {className: "nav navbar-nav navbar-right"}, 
              React.createElement("li", {className: "close-app"}, 
                React.createElement("a", {href: "#", onClick: this.handleCloseApp})
              )
            )
          )
        )
      )
    )
  }
});

module.exports = NavBar
