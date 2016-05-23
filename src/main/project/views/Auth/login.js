'use strict';

import React from 'react';
import { Link } from 'react-router';
import { ipcRenderer, remote } from 'electron';
class Login extends React.Component {
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
    console.log("resize to main !", cmd);
    ipcRenderer.send(cmd);
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
                <h2>Account Sign-in</h2>

                <Link to={`/register`}
                className="btn btn-primary btn-lg bn-app-register">
                Register</Link>

              </div>

              <div className="form-group">
                <label className="control-label">E-Mail Address</label>
                <input type='text' name='email' className='form-control input-lg' placeholder='example@evolition.io' />
              </div>

              <div className="form-group">
                <label className="control-label">Password</label>
                <input type='password' name='password' className='form-control input-lg' />
              </div>

              <div className="form-group">

                <Link to={`/intro`}
                onClick={() => this._onAppCTRL('resize-to-main')}
                className="btn btn-primary bn-app-login">Login </Link>

                <Link to={`/forgot_password`}
                className="btn btn-primary pull-right bn-app-forgot">Forgot Password</Link>

              </div>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

module.exports = Login;

// {this.props.children}
