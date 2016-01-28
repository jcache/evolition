require('events').EventEmitter.prototype._maxListeners = 20;

var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { WindowResizeListener } from 'react-window-resize-listener';
var NavBar        = require('./components/navbar.jsx');
var BigBody        = require('./components/big-body.jsx');
var LeftNav       = require('./components/left-nav.jsx');
var Viewport      = require('./components/viewport.jsx');
var CharacterActions = require('./actions/character-actions.jsx');
var CharacterStore  = require('./stores/character-store.jsx');
WindowResizeListener.DEBOUNCE_TIME = 5;
CharacterActions.fetchCharacters();

CharacterActions.fetchViews();
let CharacterOpen;
var AppContainer = React.createClass({
  getInitialState: function(){
    return {
      isCharacterOpen: false,
    }
  },
  _onClose: function(){
    ipc.send('close_mainwin');
  },

  componentWillMount: function(){
    CharacterStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    CharacterStore.removeChangeListener(this._onChange);
  },
  _onShowCharacters: function(){
    CharacterActions.toggleCharacters(!this.state.isCharacterOpen);
  },
  _onChange: function(){
    this.setState({
      isCharacterOpen: CharacterStore.getToggleCharacters()
    })
  },
  render: function(){
    CharacterOpen = this.state.isCharacterOpen;
    return (
      <div className='app'>
        <header className='app-top-bar'>
          <ul className='app-window-controls pull-right'>
            <li>
              <a className='app-minimize' href='#'></a>
            </li>
            <li>
              <a  className='app-close'  href='#'></a>
            </li>
          </ul>
        </header>
        <div className='flexbox-container app-container' id='appContainer'>
        <WindowResizeListener onResize={windowSize => {
          var height = windowSize.windowHeight - 45;
          document.getElementById('appContainer').setAttribute("style","height:"+ height +"px");
        }}/>
          <div className='flexbox-item app-nav-left'>
            <ul>
              <li>
                <a href='#' onClick={this._onShowCharacters}><img src='' /></a>
              </li>
              <li>
                <a href='#'><img src='' /></a>
              </li>
              <li>
                <a href='#'><img src='' /></a>
              </li>
              <li>
                <a href='#'><img src='' /></a>
              </li>
              <li>
                <a href='#'><img src='' /></a>
              </li>
              <li>
                <a href='#'><img src='' /></a>
              </li>
              <li>
                <a href='#'><img src='' /></a>
              </li>
            </ul>
          </div>
          <BigBody isCharacterOpen={CharacterOpen} />
        </div>
      </div>
    )
  }
});

ReactDOM.render(
  <AppContainer />, document.getElementById('app')
);
