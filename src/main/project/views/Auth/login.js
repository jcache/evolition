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
    console.log('{ -> } : FORWARD TO LOGIN');
    ipcRenderer.send('resize-to-main');
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
              <div className='row'>
                <div className='col-xs-9'>
                  <h2>Account Sign-in</h2>
                </div>
                <div className='col-xs-3'>
                  <Link to={`/register`}
                    onClick={this._onAppCTRL.bind(this)}
                    className="btn btn-primary form-control btn-sm app-func bn-app-login pull-right">
                      Register
                  </Link>
                </div>
              </div>

              <hr/>
              <div className="form-group">
                <label className="control-label">E-Mail Address</label>
                <input type='text' name='email' className='form-control input-lg' placeholder='example@evolition.io'/>
              </div>
              <div className="form-group">
                <label className="control-label">Password</label>
                <input type='password' name='password' className='form-control input-lg' />
              </div>
              <Link to={`/intro`}
                onClick={this._onAppCTRL.bind(this)}
                className="btn btn-primary form-control btn-lg app-func bn-app-login">
                  Submit
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Login;

// {this.props.children}
