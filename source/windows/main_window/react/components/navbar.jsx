import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import NavItem from './elements/nav-item.jsx';

var NavBar = React.createClass({
  getInitialState: function(){
    return {
      item: 'i'
    };
  },
  _onClose: function(){
    ipc.send('close_mainwin');
  },
  render: function(){
    return (
      <nav id="app-nav" className="navbar navbar-default">
        <div className='container-fluid'>
          <div className='navbar-collapse collapse' id='navbar'>
            <ul className="nav navbar-nav navbar-right">
              <li className="close-app">
                <a href="#" onClick={this._onClose}></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = NavBar
