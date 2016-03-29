'use strict';

const React = require('react');
const evActions = require('../../_actions/actions.js');


class Anon extends React.Component {

  constructor(props){
    super(props);
    this.state = {}
    this._onChange = this._onChange.bind(this);
  }

  _onChange(){
    this.state = {}
  }

  _onAppCTRL(cmd, bool){
    ipc.send(cmd);
    if(cmd == 'resize-to-login'){
      evActions.showLogin(true);
    } else if ( cmd == 'resize-to-main'){
      evActions.showLogin(false);
    }
  }


  render(){
    return(
      <div className={'anonymous-view ' + this.props.shown}>
        <div className='auth-screen'>
          <div className='login-container'>
            <p>test</p>
            <ul>
              <li><a href='#' className='app-func bn-app-close' onClick={this._onAppCTRL.bind(this, 'app_close')}>Close App</a></li>
              <li><a href='#' className='app-func bn-app-minimize' onClick={this._onAppCTRL.bind(this, 'app_minimize')}>Minimize App</a></li>
              <li><a href='#' className='app-func bn-app-logout' onClick={this._onAppCTRL.bind(this, 'resize-to-login', true)}>Resize to Login</a></li>
              <li><a href='#' className='app-func bn-app-login' onClick={this._onAppCTRL.bind(this, 'resize-to-main', true)}>Resize to Main</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
};


module.exports = Anon
