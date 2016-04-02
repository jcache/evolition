'use strict';

const React = require('react');

const evActions = require('../../_actions/actions');

const evStore  = require('../../_stores/evStore');

import {Link} from 'react-router';

class Anon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      shown: evStore.getLoginShown(),
    };
    this._onChange = this._onChange.bind(this);
    this._onAppCTRL = this._onAppCTRL.bind(this);

  }

  componentWillMount () {
    evStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    evStore.removeChangeListener(this._onChange);
  }

  _onChange () {
    this.setState({
      shown: evStore.getLoginShown(),
    });
  }

  _onAppCTRL (cmd) {
    ipc.send('resize-to-main');
  }

  render () {

    return (
      <div className={'anonymous-view'}>
        <div className='auth-screen'>
          <div className='login-container'>
            <p>test</p>
            <ul>
              <li>
                <Link to="/signedin"
                  onClick={this._onAppCTRL.bind(this)}
                  activeClassName="app-func bn-app-login">
                    Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
};


module.exports = Anon
