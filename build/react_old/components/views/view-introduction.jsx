"use strict";

import React from 'react';
import evApplicationStore from '../../stores/ev-app-store.jsx';
import evActions from '../../actions/ev-actions.jsx';

var Intro = React.createClass({
  render: function(){
    return (
      <div className='row' id='introduction-view'>
        <div className='col-xs-12'>
          <h1>Welcome</h1>
          <p>This is some cool stuff</p>
        </div>
      </div>
    )
  }
});

module.exports = Intro
