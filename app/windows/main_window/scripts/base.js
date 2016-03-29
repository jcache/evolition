'use strict';

const React = require('react');

const Anon = require('./views/anon/handler.js');
const SignedIn = require('./views/signedin/handler.js');
const evActions = require('./_actions/actions.js');
const evStore  = require('./_stores/evStore.js');
class Base extends React.Component {

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
    
    console.log(evStore.getLoginShown());
  }

  render () {
    console.log("render -> ", this.state.show_login);
    return (
      <div className='app'>
        <Anon shown={this.state.show_login == true ? 'shown' : 'hidden'}/>
        <SignedIn shown={this.state.show_login == false ? 'shown' : 'hidden'}/>
      </div>
    );
  }
}
module.exports = Base;
