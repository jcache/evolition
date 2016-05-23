'use strict';

import React from 'react';
import { Link } from 'react-router';

class ForgotPassword extends React.Component {
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


          <div className="auth-container">
            <form>
              <div className='auth-header'>
                <h2>Forgot Password</h2>
              </div>

              <div className="form-group">
                <label className="control-label">E-Mail Address</label>
                <input type='text' name='email' className='form-control input-lg' placeholder='example@evolition.io' />
              </div>

              <div className="form-group">
                <Link to={`password_reset`}
                  className="btn btn-primary bn-app-login">
                  Send Confirmation Email
                </Link>
              </div>
              <div className="form-group">
                <Link to={`/`}
                  className="btn btn-primary bn-app-login">
                  Go Back
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ForgotPassword;

// {this.props.children}
