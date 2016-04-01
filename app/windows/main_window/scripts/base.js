'use strict';

const React = require('react');

const Anon = require('./views/anon/handler.js');
const SignedIn = require('./views/signedin/handler.js');
const evActions = require('./_actions/actions.js');
const evStore  = require('./_stores/evStore.js');
const { PropTypes } = React;

class Base extends React.Component {
  constructor (props) {
    super(props);

  }

  render () {
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
}
module.exports = Base;
