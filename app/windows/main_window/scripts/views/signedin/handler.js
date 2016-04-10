'use strict';

const React = require('react');
const evActions = require('../../_actions/actions.js');
const evStore  = require('../../_stores/evStore');
const AppHeader  = require('../../components/app-header');
const AppFooter  = require('../../components/app-footer');
const AppLeftNav  = require('./_components/app-left-nav');

class SignedIn extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    let {pathname} = this.props.location;
    return (
      <div className='signedin-view'>
        <AppHeader />
        <div className='app-body-container'>
          <AppLeftNav pathname={pathname} />
          {this.props.children}
        </div>
      </div>
    );
  }
};

module.exports = SignedIn;
