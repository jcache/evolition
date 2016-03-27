'use strict';

const React = require('react');

class Base extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authenticated: this.props.authenticated
    }

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount(){}
  componentDidMount(){}
  componentWillUnmount(){}

  _onChange(){
    this.state = {}
  }

  render(){
    return(
      <div className='app login-screen'>
        <div className='login-container'>
          <p>test</p>
        </div>
      </div>
    )
  }
}
module.exports = Base
