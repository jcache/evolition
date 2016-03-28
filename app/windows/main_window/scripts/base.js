'use strict';

const React = require('react');

const Anon = require('./views/anon/handler.js');
const SignedIn = require('./views/signedin/handler.js');

class Base extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
      authenticated: this.props.authenticated // false
    }
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount(){}
  componentDidMount(){}
  componentWillUnmount(){}

  _onAppCTRL(cmd){
    ipc.send(cmd);
  }

  _onChange(){
    this.state = {}
  }

  render(){

    return(
      <div className='app'>
        <Anon shown={this.state.authenticated == true ? 'hidden' : 'shown'}/>
        <SignedIn shown={this.state.authenticated == false ? 'shown' : 'hidden'}/>
      </div>
    )
  }
}
module.exports = Base
