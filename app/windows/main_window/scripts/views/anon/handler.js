'use strict';

const React = require('react');
const evActions = require('../../_actions/actions');
const evStore  = require('../../_stores/evStore');

class Anon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      shown: evStore.getLoginShown(),
    };
    this._onChange = this._onChange.bind(this);

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

  _onAppCTRL (cmd, bool) {

    if (cmd == 'resize-to-login') {
      evActions.showLogin(true);
    } else if (cmd == 'resize-to-main') {
      evActions.showLogin(false);
    }

    ipc.send(cmd);
  }

  render () {
    var shown = this.state.shown == false ? "hidden" : "shown";

    return (
      <div className={'anonymous-view ' + shown}>
        <div className='auth-screen'>
          <div className='login-container'>
            <p>test</p>
            <ul>
              <li><a href='#'
                className='app-func bn-app-login'
                onClick={this._onAppCTRL.bind(this, 'resize-to-main', true)}>Resize to Main</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
};


module.exports = Anon
