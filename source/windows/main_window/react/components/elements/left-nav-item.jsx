import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

var LeftNavItem = React.createClass({
  getInitialState: function(){
    return{
      character: this.props.character
    }
  },
  render: function(){
    return (
      <div>
        ...
      </div>
    )
  }
});

module.exports = LeftNavItem
 
