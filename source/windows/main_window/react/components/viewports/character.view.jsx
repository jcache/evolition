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
  _onChangeView: function(e){
    e.preventDefault();
    var view = e.target.getAttribute("data-view");
    CharacterActions.changeView(view);
  },
  _onChange: function(){
    this.setState({
      changed: true,
    })
  },
  render: function(){
    var stats = []
    var character = this.props.character;
    if(character.stats){
      _.each(character.stats, function(stat,index,i){
        stats.push(
          <li key={index}>
            <span className='stat-abbv'>{index}</span>
            <span className='stat-value'>{stat}</span>
          </li>
        )
      });
    }
    return (
      <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={2000} transitionEnterTimeout={2000} transitionLeaveTimeout={2000}>
        <div className='row view-handler' id='character-edit-view'>
          <div className='col-xs-12 viewport-container'>
            <div className="viewport-header">
              <h1>View Character<a onClick={this._onChangeView} data-view='character_edit' className='btn pull-right btn-primary'>Edit Character</a></h1>
            </div>
            <div className='viewport-body'>
              <div className='row'>
                <div className='col-xs-2'>
                  <div className='stat-container'>
                    <ul>
                      {stats}
                    </ul>
                  </div>
                </div>
                <div className='col-xs-10'>
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
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
});
//
module.exports = ViewCharacter
