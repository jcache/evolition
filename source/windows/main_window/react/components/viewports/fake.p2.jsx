"use strict";
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//
var FakePage2 = React.createClass({ 
  render: function(){
    return (
      <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={300} transitionLeaveTimeout={500}>
        <div className='row view-handler' id='character-edit-view'>
          <div className='col-xs-12 viewport-container'>
            <div className="viewport-header">
              <h1>Fake page 2</h1>
            </div>

          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
});
module.exports = FakePage2
