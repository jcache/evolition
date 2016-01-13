require('events').EventEmitter.prototype._maxListeners = 20;

var React         = require('react');
var ReactDOM      = require('react-dom');
var MiniNav       = require('./views/mini-nav.jsx');
var CharacterList = require('./views/character-list.jsx');
var Viewport      = require('./views/viewport.jsx');
var NavBar        = require('./views/navbar.jsx');
var Initializer  = require('../lib/initializer.jsx');
var EvAPI        = require('../lib/evolition_api.jsx');

Initializer.init();

EvAPI.getCharacterData();

var AppContainer = React.createClass({
  render: function(){
    return (
      <div className='app'>
        <NavBar />
        <div className='row-fluid' id="app-body">
          <MiniNav />
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
