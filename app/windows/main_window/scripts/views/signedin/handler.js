'use strict';

const React = require('react');
const evActions = require('../../_actions/actions.js');


class SignedIn extends React.Component {

  constructor(props){
    super(props);
    this.state = {} // state
    this._onChange = this._onChange.bind(this);
  }

  _onChange(){
    this.state = {} // state
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
      <div className={'signedin-view ' + this.props.shown}>
        <div className='app-header'>
          <ul>
            <li><a href='#' className='app-func bn-app-close' onClick={this._onAppCTRL.bind(this, 'app_close')}>Close App</a></li>
            <li><a href='#' className='app-func bn-app-minimize' onClick={this._onAppCTRL.bind(this, 'app_minimize')}>Minimize App</a></li>
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
    )
  }
};


module.exports = SignedIn
