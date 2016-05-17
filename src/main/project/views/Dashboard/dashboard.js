'use strict';
import React from 'react';
import { Link } from 'react-router';

class Dashboard extends React.Component {
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
    // console.log('{ -> } : FORWARD TO LOGIN');
  }

  render () {
    return (
      <div className={`app-base dashboard-index`}>
        <p>Dashboard</p>
        <Link
          to={`/intro`}
          onClick={this._onAppCTRL.bind(this)}
          className="btn btn-primary form-control btn-lg app-func bn-app-login">
            Go to Intro
        </Link>
      </div>
    );
  }
}

module.exports = Dashboard;

// {this.props.children}
