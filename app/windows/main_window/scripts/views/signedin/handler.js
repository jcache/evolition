'use strict';

const React = require('react');
const evActions = require('../../_actions/actions.js');
const evStore  = require('../../_stores/evStore');
import {Link} from 'react-router';


class SignedIn extends React.Component {

  constructor (props) {
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
      <div className='signedin-view'>
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

        <div className='app-body-container'>
          <div className='app-left-nav'>
            <ul>
              <li><Link to="/signedin/1" onClick={this._onChangeView.bind(this, 'default-view')} activeClassName='characters-link'></Link></li>
              <li><Link to="/signedin/2" onClick={this._onChangeView.bind(this, 'character-add')} activeClassName='character-add-link'></Link></li>
              <li><Link to="/signedin/3" onClick={this._onChangeView.bind(this, 'fake_page_1')} activeClassName='character-add-link'></Link></li>
              <li><Link to="/signedin/4" onClick={this._onChangeView.bind(this, 'fake_page_2')} activeClassName='character-add-link'></Link></li>
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
