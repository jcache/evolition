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
      saved:  false,
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
      character: CharacterStore.getSelectedCharacter(),
      saved: true,
    })
  },
  render: function(){
    var formClassName = '';
    var character = this.state.character;
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
        <div className='row view-handler' id='character-edit-view'>
          <div className='col-xs-12 viewport-container'>
            <div className="viewport-header">
              <h1>Edit Character</h1>
            </div>
            <Formsy.Form className={formClassName} onSubmit={this.submitForm} ref="form">
              <div className='col-xs-2 stat-list'>
                <StatList shared_props={sharedProps} gamesystem="Rolemaster Evolition" stats={character.stats}/>
              </div>

              <div className='col-xs-10 basic-list'>
                <div className='row'>
                  <div className='col-xs-6'>
                    <Input {...sharedProps} name="id" value={character.id} label="Character Name:" type="hidden" required />
                    <Input {...sharedProps} name="character_name" value={character.character_name} label="Character Name:" type="text" required />
                  </div>
                  <div className='col-xs-3'>
                    <Input {...sharedProps} name="race" value={character.race} label="Race:" type="text" required />
                  </div>
                  <div className='col-xs-3'>
                    <Input {...sharedProps} name="gender" value={character.gender} label="Gender:" type="text" required />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-xs-6'>
                    <Input {...sharedProps} name="game_system_name" value={character.game_system_name} label="Game System:" type="text"  required />
                  </div>
                  <div className='col-xs-6'>
                    <Input {...sharedProps} name="campaign_name" value={character.campaign_name} label="Campaign:" type="text" required />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-xs-6'>
                    <Input {...sharedProps} name="level" value={character.level} label="Level:" type="number" required />
                  </div>
                </div>
                <input className="btn btn-success btn-raised" formNoValidate={false} type="submit" defaultValue="Save Character" />
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
