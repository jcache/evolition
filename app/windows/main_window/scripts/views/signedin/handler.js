'use strict';

const React = require('react');
const evActions = require('../../_actions/actions.js');
const evStore  = require('../../_stores/evStore');
class SignedIn extends React.Component {

  constructor (props) {
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
    if (cmd == 'resize-to-main') {
      evActions.showLogin(false);
    }
    ipc.send(cmd);

  }

  render () {
    console.log(this.state.shown);
    var shown = this.state.shown == true ? "shown" : "hidden";
    return (
      <div className={'signedin-view ' + shown}>
        <div className='app-header'>
          <ul>
            <li>
              <a href='#'
                className='app-func bn-app-close'
                onClick={this._onAppCTRL.bind(this, 'app_close')}>Close App</a></li>
            <li>
              <a href='#'
                className='app-func bn-app-minimize'
                onClick={this._onAppCTRL.bind(this, 'resize-to-main', this.state.shown)}>Login</a></li>
          </ul>
        </div>

        <div className='app-body-container'>
          <div className='app-left-nav'>
            ...
          </div>

          <div className='app-listview'>
            <div className='app-character-list'>
              ... scrollbar
              ...
            </div>

            <div className='app-campaign-list'>
              ... scrollbar
              ...
            </div>
          </div>
          <div className='app-main-view'>
            ...
          </div>
        </div>
      </div>
    );
  }
};

module.exports = SignedIn;
