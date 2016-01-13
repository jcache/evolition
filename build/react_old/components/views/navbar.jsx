"use strict";

import React from 'react';
import evApplicationStore from '../../stores/ev-app-store.jsx';
import evActions from '../../actions/ev-actions.jsx';


class NavBar extends React.Component {
  constructor(props){
    super(props);
  }
  handleCloseApp(e){
    e.preventDefault();
    ipc.send('close_mainwin');
  }
  render(){
    return (
      <nav id="app-nav" className="navbar navbar-default">
        <div className='container-fluid'>
          <div className='navbar-collapse collapse' id='navbar'>
            <ul className="nav navbar-nav navbar-right">
              <li className="close-app">
                <a href="#" onClick={this.handleCloseApp}></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

module.exports = NavBar
