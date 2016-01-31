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
      isListOpen: CharacterStore.getListState()
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
  _onChangeView: function(e){
    e.preventDefault();
    var view = e.target.getAttribute("data-view");
    var list_shown = e.target.getAttribute("data-list-shown");
    CharacterActions.toggleCharacters(list_shown);
    CharacterActions.changeView(view);
  },
  _onChange: function(){
    this.setState({
      isListOpen: CharacterStore.getListState()
    })
  },
  render: function(){
    CharacterOpen = this.state.isListOpen;
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
                <a href='#' onClick={this._onChangeView} data-view='character_view' data-list-shown='true'><img src='' /></a>
              </li>
              <li>
                <a href='#' onClick={this._onChangeView} data-view='default' data-list-shown='false'><img src='' /></a>
              </li>
              <li>
                <a href='#' onClick={this._onChangeView} data-view='character_add' data-list-shown='true'><img src='' /></a>
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
          <BigBody isListOpen={CharacterOpen} />
        </div>
      </div>
    )
  }
});

ReactDOM.render(
  <AppContainer />, document.getElementById('app')
);
