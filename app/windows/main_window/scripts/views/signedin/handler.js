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
    if (cmd == 'resize-to-login') {
      evActions.showLogin(true);
    }

    ipc.send(cmd);
  }

  _onChangeView (cmd) {
    console.log(cmd);
    evActions.changeView(cmd);
  }

  render () {
    return (
      <div>
        <div className='app-header'>
          <ul>
            <li>
              <a href='#'
                className='app-func bn-app-close'
                onClick={this._onAppCTRL.bind(this, 'app_close')}></a></li>
            <li>
              <a href='#'
                className='app-func bn-app-minimize'
                onClick={this._onAppCTRL.bind(this, 'resize-to-login')}></a></li>
          </ul>
        </div>

        <div className='app-body-container'>
          <div className='app-left-nav'>
            <ul>
              <li>
                <a href='#' className="characters-link" onClick={this._onChangeView.bind(this, 'default-view')}></a>
              </li>
              <li>
                <a href='#' className="character-add-link" onClick={this._onChangeView.bind(this, 'character_add')}></a>
              </li>
              <li>
                <a href='#' className="character-add-link" onClick={this._onChangeView.bind(this, 'fake_page_1')}></a>
              </li>
              <li>
                <a href='#' className="character-add-link" onClick={this._onChangeView.bind(this, 'fake_page_2')}></a>
              </li>
            </ul>
          </div>

          <div className='app-listview '>
            <div className='app-character-list'>
              ... scrollbar
              <a href="#juice">juice</a>
              <a href="#juices">juice</a>
              <a href="#juicesssss">juice</a>
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
        <div className='app-footer'>
          ...
        </div>
      </div>
    );
  }
};

module.exports = SignedIn;
