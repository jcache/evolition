import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
var CharacterActions  = require('../actions/character-actions.jsx');
var CharacterStore  = require('../stores/character-store.jsx');

var LeftNav = React.createClass({
  getInitialState: function(){
    return {
      views: CharacterStore.fetchViews(),
      selected: CharacterStore.getSelectedView()
    }
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
    CharacterActions.changeView(view);
  },
  _onChange: function(){
    this.state = {
      views: CharacterStore.fetchViews(),
      selected: CharacterStore.getSelectedView()
    }
  },
  render: function(){
    // RETURN LIST
    return (
      <div className='col-xs-1' id='mini-nav'>
        <ul>
          <li>
            <a href='#' className="characters-link" onClick={this._onChangeView} data-view='default'></a>
          </li>
          <li>
            <a href='#' className="character-add-link" onClick={this._onChangeView} data-view='character_add'></a>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = LeftNav
