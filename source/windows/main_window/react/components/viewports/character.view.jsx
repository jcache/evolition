"use strict";
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//
var ViewCharacter = React.createClass({
    getInitialState: function() {
      return {
        layout: 'vertical',
        validatePristine: false,
        saved:  false,
        stats: CharacterStore.getStats(),
        character:  CharacterStore.getSelectedCharacter(),
        disabled: false
      };
    },
    componentWillMount: function(){
      CharacterStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
      CharacterStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
      this.setState({
        character: CharacterStore.getSelectedCharacter(),
        stats: CharacterStore.getStats(),
        saved: true,
      })
    },
  render: function(){
    return (
      <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={300} transitionLeaveTimeout={500}>
        <div className='row view-handler' id='character-edit-view'>
          <div className='col-xs-12 viewport-container'>
            <div className="viewport-header">
              <h1>View Character</h1>
            </div>

          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
});
//
module.exports = ViewCharacter
