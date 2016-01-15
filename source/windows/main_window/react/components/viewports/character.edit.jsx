"use strict";
import React from 'react';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
var CharacterActions  = require('../../actions/character-actions.jsx');
var CharacterStore  = require('../../stores/character-store.jsx');
import StatList from '../elements/stat-list.jsx';

var Input     = FRC.Input;
var File      = FRC.File;
var Select    = FRC.Select;
var Textarea  = FRC.Textarea;
//
var EditCharacter = React.createClass({
  getInitialState: function() {
    return {
      layout: 'vertical',
      validatePristine: false,
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
  resetForm: function() {
    this.refs.form.reset();
  },

  submitForm: function(data) {
    console.log(data);
    CharacterActions.editCharacter(data);
  },
  changeOption: function(name, value) {
    var newState = {};
    newState[name] = value;
    this.setState(newState);
  },
  _onChange: function(){
    this.setState({
      character: CharacterStore.getSelectedCharacter()
    })
  },
  render: function(){
    var formClassName = '';

    if (this.state.layout === 'horizontal') {
      formClassName = 'form-horizontal';
    }

    var sharedProps = {
      layout: this.state.layout,
      validatePristine: this.state.validatePristine,
      rowClassName: 'form-group label-floating',
      labelClassName: 'control-label',
      disabled: this.state.disabled
    };
    return (
      <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={300} transitionLeaveTimeout={500}>
        <div className='row view-handler' id='character-add-view'>
          <div className='col-xs-12 viewport-container'>
            <div className="viewport-header">
              <h1>Form Playground</h1>
            </div>
            <Formsy.Form className={formClassName} onSubmit={this.submitForm} ref="form">
              <div className='col-xs-2 stat-list'>
                <StatList shared_props={sharedProps} gamesystem="Rolemaster Evolition"/>
              </div>

              <div className='col-xs-10 basic-list'>
                <div className='row'>
                  <div className='col-xs-6'>
                    <Input {...sharedProps} name="character_name" value="" label="Character Name:" type="text" required />
                  </div>
                  <div className='col-xs-3'>
                    <Input {...sharedProps} name="race" value="" label="Race:" type="text" required />
                  </div>
                  <div className='col-xs-3'>
                    <Input {...sharedProps} name="gender" value="" label="Gender:" type="text" required />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-xs-6'>
                    <Input {...sharedProps} name="game_system_name" value="" label="Game System:" type="text"  required />
                  </div>
                  <div className='col-xs-6'>
                    <Input {...sharedProps} name="campaign_name" value="" label="Campaign:" type="text" required />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-xs-6'>
                    <Input {...sharedProps} name="level" value="" label="Level:" type="number" required />
                  </div>
                </div>
                <input className="btn btn-success btn-raised" formNoValidate={false} type="submit" defaultValue="Add Character" />
              </div>
            </Formsy.Form>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
});
//
module.exports = EditCharacter
