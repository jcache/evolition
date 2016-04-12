'use strict';

const React = require('react');
import {evActions} from '../_actions/actions.js';
import {Link} from 'react-router';
const { PropTypes } = React;

class AppHeader extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      active: "true",
    };

    // this._onChange = this._onChange.bind(this);
    this._onAppCTRL = this._onAppCTRL.bind(this);
  }

  _onAppCTRL (cmd, bool) {
    console.log("cmd: ", cmd,"boolean: ", bool);
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
              onClick={this._onAppCTRL.bind(this, 'resize-to-login')}
              className='app-func bn-app-minimize'>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
module.exports = AppHeader;
