'use strict';
import React from 'react';
import { Link } from 'react-router';
import { ipcRenderer, remote } from 'electron';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._onChange = this._onChange.bind(this);
    this._onAppCTRL = this._onAppCTRL.bind(this);
  }

  _onChange () {
    this.setState({});
  }

  _onAppCTRL (cmd) {
    console.log('{ -> } : FORWARD TO LOGIN');
    ipcRenderer.send('resize-to-login');

  }

  render () {
    return (
      <div className={`app-base intro-index`}>
        <p>Welcome</p>
        <Link
          to={`/character_view`}
          className="btn btn-primary form-control btn-lg app-func bn-app-login">
            Go to Characters
        </Link>
        <Link
          to={`/`}
          onClick={this._onAppCTRL.bind(this)}
          className="btn btn-primary form-control btn-lg app-func bn-app-login">
            Go to Signin
        </Link>
      </div>
    );
  }
}

module.exports = Welcome;

// {this.props.children}
