'use strict';
import React from 'react';
import { Link } from 'react-router';

class CharacterList extends React.Component {
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
    console.log('{ -> } : FORWARD TO DASHBOARD');
  }

  render () {
    return (
      <div className={`app-base character-list`}>
        <p>Character List</p>
        <Link
          to={`dashboard`}
          onClick={this._onAppCTRL.bind(this)}
          className="btn btn-primary form-control btn-lg app-func bn-app-login">
            Go to Dashboard
        </Link>
      </div>
    );
  }
}

module.exports = CharacterList;

// {this.props.children}
