'use strict';

const React = require('react');
class Base extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      authenticated: this.props.authenticated
    }
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount(){}
  componentDidMount(){}
  componentWillUnmount(){}

  _onAppCTRL(cmd){
    // console.log(typeof cmd, cmd);
    ipc.send(cmd);
  }

  _onChange(){
    this.state = {}
  }

  render(){
    return(
      <div className='app login-screen'>
        <div className='login-container'>
          <p>test</p>
          <ul>
            <li><a href='#' className='app-func bn-app-close' onClick={this._onAppCTRL.bind(this, 'app_close')}>Close App</a></li>
            <li><a href='#' className='app-func bn-app-minimize' onClick={this._onAppCTRL.bind(this, 'app_minimize')}>Minimize App</a></li>
            <li><a href='#' className='app-func bn-app-maximize' onClick={this._onAppCTRL.bind(this, 'resize-to-login')}>Resize to Login</a></li>
            <li><a href='#' className='app-func bn-app-maximize' onClick={this._onAppCTRL.bind(this, 'resize-to-main')}>Resize to Main</a></li>
          </ul>
        </div>
      </div>
    )
  }
}
module.exports = Base
