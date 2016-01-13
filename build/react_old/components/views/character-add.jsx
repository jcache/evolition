"use strict";

var React = require('react');
var Formsy = require('formsy-react');
var FRC = require('formsy-react-components');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Input = FRC.Input;
var Select = FRC.Select;

import evApplicationStore from '../../stores/ev-app-store.jsx';
import evActions from '../../actions/ev-actions.jsx';

var StatList = require('./stat-list.jsx');

var CharacterAdd = React.createClass({
  getInitialState: function() {
    return {
      layout: 'vertical',
      validatePristine: false,
      saved:  true,
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
    console.log(data);
    evActions.addCharacter(data);
  },
  changeOption: function(name, value) {
    var newState = {};
    newState[name] = value;
    this.setState(newState);
  },

  _onChange: function(){
    this.setState({
      saved: true,
    })
  },
  render: function(){
    var formClassName = '';

    if (this.state.layout === 'horizontal') {
      formClassName = 'form-horizontal';
    }
    var game_system_choices = [
        {value: 'EVO', label: 'Evolition Rolemaster'},
        {value: 'ICE', label: 'I.C.E Rolemaster'},
        {value: 'HRP', label: 'H.A.R.P Rolemaster'}
    ];

    var game_system_options = game_system_choices.slice(0);
    game_system_options.unshift({value: '', label: 'Please select…'});

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
              <h1>Add Character</h1>
            </div>
            <Formsy.Form className={formClassName} onSubmit={this.submitForm} ref="form">
              <div className='col-xs-2 stat-list'>
                <StatList {...sharedProps} gamesystem="Rolemaster Evolition"/>
              </div>

              <div className='col-xs-10 basic-list'>
                <div className='row'>
                  <div className='col-xs-6'>
                    <Input {...sharedProps} name="character_name" value="" label="Character Name:" type="text" required />
                  </div>
                  <div className='col-xs-4'>
                    <Input {...sharedProps} name="race" value="" label="Race:" type="text" required />
                  </div>
                  <div className='col-xs-2'>
                    <Input {...sharedProps} name="gender" value="" label="Gender:" type="text" required />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-xs-6'>
                    <Select {...sharedProps} name="game_system_name" value="" label="Game System" help="This is a required select element." options={game_system_options} required />
                  </div>
                  <div className='col-xs-4'>
                    <Input {...sharedProps} name="campaign_name" value="" label="Campaign:" type="text" required />
                  </div>
                  <div className='col-xs-2'>
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

module.exports = CharacterAdd
