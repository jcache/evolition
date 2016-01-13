"use strict";

var React       = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

import evApplicationStore from '../../stores/ev-app-store.jsx';
import evActions from '../../actions/ev-actions.jsx';

var DefaultView = React.createClass({
  render: function(){
    return (
      <div className='row' id='introduction-view'>
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={300} transitionLeaveTimeout={500}>
          <div className='col-xs-12'>
            <h1>Default View</h1>
            <p>This is some cool stuff</p>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
});

module.exports = DefaultView
