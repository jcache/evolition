'use strict';

const React = require('react');
import { Link } from 'react-router';
const { PropTypes } = React;
import { connect } from 'react-redux';

class AppHeader extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      active: "true",
    };

    this._onAppCTRL = this._onAppCTRL.bind(this);
  }

  _onAppCTRL (cmd, bool) {
    console.log("cmd: ", cmd,"boolean: ", bool);
    // cmd == 'resize-to-login' ? evActions.showLogin(bool) : evActions.showLogin(bool)
    ipc.send(cmd);
  }

  render () {
    const { dispatch } = this.props;
    console.log(dispatch);
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
}
module.exports = AppHeader;
