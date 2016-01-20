"use strict";
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
var CharacterActions  = require('../../actions/character-actions.jsx');
var CharacterStore  = require('../../stores/character-store.jsx');
//
var ViewCharacter = React.createClass({
  getInitialState: function() {
    return {
      changed: true
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
      changed: true,
    })
  },
  render: function(){
    var character = this.props.character;
    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={500}>
        <div className='row view-handler' id='character-edit-view'>
          <div className='col-xs-12 viewport-container'>
            <div className="viewport-header">
              <h1>View Character</h1>
            </div>
            <div className='viewport-body'>
              <div className='row'>
                <div key='1' className='col-xs-3  col-xs-push-9'>
                  <div style={{backgroundImage: "url(" +character.profile_pic+ ")"}} className='contain-photo'></div>
                </div>
                <div className='col-xs-9 col-xs-pull-3'>
                  <div className='row'>
                    <div className='col-xs-6'>
                      <span className='c-detail'>Character Name
                        <strong>{character.character_name}</strong>
                      </span>
                    </div>
                    <div className='col-xs-6'>
                      <span className='c-detail'>Player Name
                        <strong>Kevin Carr</strong>
                      </span>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-xs-6'>
                      <span className='c-detail'>Campaign
                        <strong>{character.campaign_name}</strong>
                      </span>
                    </div>
                    <div className='col-xs-6'>
                      <span className='c-detail'>Gamesystem
                        <strong>{character.game_system_name}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
});
//
module.exports = ViewCharacter
