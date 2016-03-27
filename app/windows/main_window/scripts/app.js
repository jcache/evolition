'use strict';

const React = require('react');
const Base = require('./base.js');
import { render } from 'react-dom'

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      authenticated: "false",
    }
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount(){}

  componentDidMount(){}

  componentWillUnmount(){}

  _onChange(){}

  render(){
    return(
      <Base authenticated={this.state.authenticated} />
    )
  }
};


render(<App />, document.getElementById('evolition'));
