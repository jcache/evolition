require('events').EventEmitter.prototype._maxListeners = 20;

var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var NavBar        = require('./components/navbar.jsx');
var LeftNav       = require('./components/left-nav.jsx');
var CharacterList = require('./components/character-list.jsx');
var Viewport      = require('./components/viewport.jsx');
var CharacterActions = require('./actions/character-actions.jsx');

CharacterActions.fetchCharacters();
CharacterActions.fetchViews();

var AppContainer = React.createClass({
  render: function(){
    return (
      <div className='app'>
        <NavBar />
        <div className='row-fluid' id="app-body">
          <LeftNav />
          <CharacterList />
          <Viewport />
        </div>
      </div>
    )
  }
});

ReactDOM.render(
  <AppContainer />, document.getElementById('app')
);
