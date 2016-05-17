'use strict';

import React from 'react';
import { Link } from 'react-router';

class PasswordReset extends React.Component {
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
  }

  render () {
    return (
      <div className={`anonymous-view`}>
        <div className='auth-screen'>
          <div className='side-screen'>
            <canvas id="canvas"></canvas>
          </div>
          <div className="login-container">
            <form>
              <h2>Check your E-Mail</h2>
              <hr/>
              <p>We've sent a link to 'test@test.com'. Please use this link to create a new password.</p>
              <p>If you don't see this email in your inbox within 15 minutes, look for it in your junk-mail folder.</p>
              <p>If you find it there, please mark the email as Not Junk and add @evolition.io to your address book.</p>
              <hr/>
              <Link to={`/`} onClick={this._onAppCTRL.bind(this)}
                className="btn btn-primary form-control btn-lg app-func bn-app-login">
                  Return to Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = PasswordReset;

// {this.props.children}
