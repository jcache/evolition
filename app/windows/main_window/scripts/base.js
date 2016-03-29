'use strict';

const React = require('react');

const Anon = require('./views/anon/handler.js');
const SignedIn = require('./views/signedin/handler.js');
const evActions = require('./_actions/actions.js');
const evStore  = require('./_stores/store.js');
class Base extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
      authenticated: evStore.getLoginShown() // false
    }
    this._onChange = this._onChange.bind(this);
  }

  _onChange(){
    this.state = {
      authenticated: evStore.getLoginShown()
    }
  }

  componentWillMount () {
    evStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    evStore.removeChangeListener(this._onChange);
  }

  _onAppCTRL(cmd){
    ipc.send(cmd);
  }


  render(){

    return(
      <div className='app'>
        <Anon shown={this.state.authenticated == false ? 'hidden' : 'shown'}/>
        <SignedIn shown={this.state.authenticated == true ? 'hidden' : 'shown'}/>
      </div>
    )
  }
}
module.exports = Base
