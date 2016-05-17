'use strict';

const React = require('react');
const { PropTypes } = React;
import { Link } from 'react-router';

export default class AppHeader extends React.Component {

  constructor (props,context) {
    super(props,context);
    this._onAppCTRL = this._onAppCTRL.bind(this);
  }

  _onAppCTRL (cmd, bool) {
    // console.log("cmd: ", cmd,"boolean: ", bool);
    // cmd == 'resize-to-login' ? evActions.showLogin(bool) : evActions.showLogin(bool)
    ipc.send(cmd);
  }

  render () {
    return (
      <div className='app-header'>
        <ul>
          <li>
            <Link to="/"
              onClick={this._onAppCTRL.bind(this, 'app_close')}
              className='app-func bn-app-close'>
            </Link>
          </li>
          <li>
            <Link to="/auth"
              onClick={this._onAppCTRL.bind(this, 'app_minimize')}
              className='app-func bn-app-minimize'>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
};
