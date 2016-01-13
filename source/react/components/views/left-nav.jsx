import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LeftNavItem from './elements/left-nav-item.jsx';
var _ = require('lodash');
var data = [];


var LeftNav = React.createClass({
  getInitialState: function(){
    return {
      list: data
    }
  },
  _changeView: function(e){
    console.log(e);
  },
  _onChange: function(){
    this.state = {
      list: data
    }
  },
  render: function(){
    // RETURN LIST
    return (
      <div className='col-xs-1' id='mini-nav'>
        <ul>
          <li>
            <a href='#' className="characters-link" onClick={e => this._changeView(e)} data-view='default'></a>
          </li>
          <li>
            <a href='#' className="character-add-link" onClick={e => this._changeView(e)} data-view='character_add'></a>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = LeftNav
