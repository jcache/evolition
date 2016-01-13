require('events').EventEmitter.prototype._maxListeners = 20;

var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
//
// var NavBar        = require('./views/navbar.jsx');
// var LeftNav       = require('./views/left-nav.jsx');
// var CharacterList = require('./views/character-list.jsx');
// var Viewport      = require('./views/viewport.jsx');


var AppContainer = React.createClass({
  render: function(){
    return (
      <div className='app'>
      ... 
      </div>
    )
  }
});

ReactDOM.render(
  <AppContainer />, document.getElementById('app')
);
