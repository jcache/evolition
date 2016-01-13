"use strict";

var React = require('react');
var Formsy = require('formsy-react');
var FRC = require('formsy-react-components');

var Input = FRC.Input;
var File = FRC.File;
var Select = FRC.Select;
var Textarea = FRC.Textarea;


import evApplicationStore from '../../stores/ev-app-store.jsx';
import evActions from '../../actions/ev-actions.jsx';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


var CharacterEdit = React.createClass({
  getInitialState: function() {
    return {
      layout: 'vertical',
      validatePristine: false,
      character:  evApplicationStore.getSelectedCharacter(),
      disabled: false
    };
  },
  componentWillMount: function(){
    evApplicationStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    evApplicationStore.removeChangeListener(this._onChange);
  },
  resetForm: function() {
    this.refs.form.reset();
  },

  submitForm: function(data) {
    evActions.updateCharacter(data);
  },
  changeOption: function(name, value) {
    var newState = {};
    newState[name] = value;
    this.setState(newState);
  },
  _onChange: function(){
    this.setState({
      character: evApplicationStore.getSelectedCharacter()
    })
  },
  render: function(){
    var formClassName = '';

    var game_system_choices = [
        {value: 'EVO', label: 'Evolition Rolemaster'},
        {value: 'ICE', label: 'I.C.E Rolemaster', disabled: true},
        {value: 'HRP', label: 'H.A.R.P Rolemaster'}
    ];

    var game_system_options = game_system_choices.slice(0);
    game_system_options.unshift({value: '', label: 'Please select…'});

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
        <div className='row view-handler' id='character-edit'>
          <div className='col-xs-12 viewport-container'>
            <div className="viewport-header">
              <h1>Form Playground</h1>
            </div>
            <Formsy.Form className={formClassName} onSubmit={this.submitForm} ref="form">
              <Input {...sharedProps} name="character_name" value={this.state.character.character_name} label="Character Name:" type="text" required />
              <Select {...sharedProps} name="game_system_name" value={this.state.character.game_system_name} label="Select" help="This is a required select element." options={game_system_options} required />
              <Input {...sharedProps} name="level" value={this.state.character.level} label="Level:" type="number" required />
              <Input {...sharedProps} name="campaign_name" value={this.state.character.campaign_name} label="Campaign:" type="text" required />
              <Input {...sharedProps} name="id" value={this.state.character.id} type="hidden" />
              <input className="btn btn-success btn-raised" formNoValidate={true} type="submit" defaultValue="Update Character" />
            </Formsy.Form>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
});

module.exports = CharacterEdit
