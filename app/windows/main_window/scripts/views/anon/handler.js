'use strict';

const React = require('react');
const evActions = require('../../_actions/actions');
const evStore  = require('../../_stores/evStore');
import {Link,Navigation} from 'react-router';

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
            <h2>Please Sign In</h2>
            <form>
              <div className="form-group">
                <input type='text' name='email' className='form-control input-lg' placeholder='example@evolition.io'/>
              </div>
              <div className="form-group">
                <input type='password' name='password' className='form-control input-lg' />
              </div>
            </form>
            <Link to="/signedin"
              onClick={this._onAppCTRL.bind(this)}
              className="btn btn-primary btn-lg app-func bn-app-login">
                Please Login
            </Link>

          </div>
        </div>
      </div>
    )
  }
};


module.exports = Anon
