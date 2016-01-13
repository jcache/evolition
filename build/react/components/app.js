require('events').EventEmitter.prototype._maxListeners = 20;

var React         = require('react');
var ReactDOM      = require('react-dom');
var MiniNav       = require('./views/mini-nav.jsx');
var CharacterList = require('./views/character-list.jsx');
var Viewport      = require('./views/viewport.jsx');
var NavBar        = require('./views/navbar.jsx');

var AppContainer = React.createClass({displayName: "AppContainer",
  render: function(){
    return (
      React.createElement("div", {className: "app"}, 
        React.createElement(NavBar, null), 
        React.createElement("div", {className: "row-fluid", id: "app-body"}, 
          React.createElement(MiniNav, null), 
          React.createElement(CharacterList, null), 
          React.createElement(Viewport, null)
        )
      )
    )
  }
});

ReactDOM.render(
  React.createElement(AppContainer, null), document.getElementById('app')
);
