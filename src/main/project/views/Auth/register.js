'use strict';
'use strict';
import React from 'react';
import { Link } from 'react-router';
import { ipcRenderer, remote } from 'electron';
class Register extends React.Component {
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
      <div className={`anonymous-view`}>
        <div className='auth-screen'>
          <div className='side-screen'>
            <canvas id="canvas"></canvas>
          </div>
          <div className="login-container">
            <form>
              <div className='row'>
                <div className='col-xs-12'>
                  <h2>Register Account</h2>
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
              <Link to={`/`}
                onClick={this._onAppCTRL.bind(this)}
                className="btn btn-primary form-control btn-lg app-func bn-app-login">
                Return to Sign-in
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Register;

// {this.props.children}
