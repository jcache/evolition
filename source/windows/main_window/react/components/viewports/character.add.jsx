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
var AddCharacter = React.createClass({
  getInitialState: function() {
    return {
      layout: 'vertical',
      validatePristine: false,
      stats: CharacterStore.getStats(),
      saved:  false,
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
  submitForm: function(captured) {
    var data = captured;
    data.profile_pic = '';
    var resource_path = captured.pic[0].path;
    var resource_name = captured.pic[0].name;
    var new_resource = "";
    console.log(data.pic[0]);

    fse.copy(resource_path, dir.saved_images_file_path + resource_name, function (err) {
      data.pic = '';
      data.profile_pic = dir.saved_images_file_path + resource_name;
      CharacterActions.createCharacter(data);
      if (err) return console.error(err)
    }) // copies file


  },
  changeOption: function(name, value) {
    var newState = {};
    newState[name] = value;
    this.setState(newState);
  }, 
  enableButton() {
    this.setState({ canSubmit: true });
  },
  disableButton() {
    this.setState({ canSubmit: false });
  },
  _onChange: function(){
    this.setState({
      saved: true,
      stats: CharacterStore.getStats(),
    })
  },
  render: function(){
    var formClassName = '';
    var character_stats = [];
    var stats = this.state.stats;
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

    _.forEach(stats, function(stat){
      character_stats.push(
        <Input {...sharedProps} key={stat.id} name={"stats." + stat.abbv} value="" label={stat.abbv} type="text" required />
      )
    });
    return (
      <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={300} transitionLeaveTimeout={500}>
        <div className='row view-handler' id='character-add-view'>
          <div className='col-xs-12 viewport-container'>
            <div className="viewport-header">
              <h1>Create a Character</h1>
            </div>
            <Formsy.Form className={formClassName} onSubmit={this.submitForm} ref="form">
              <div className='col-xs-2 stat-list'>
                {character_stats}
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
                  <div className='col-xs-6'>
                    <File {...sharedProps} name="pic" label="pic:" required />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-xs-12'>
                  <Textarea {...sharedProps} rows={3} cols={40} name="appearance" label="Appearance: "
                    validations="minLength:10" validationErrors={{ minLength: 'Please provide at least 10 characters.' }} />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-xs-12'>
                  <Textarea {...sharedProps} rows={3} cols={40} name="personality" label="Personality: "
                    validations="minLength:10" validationErrors={{ minLength: 'Please provide at least 10 characters.' }} />
                  </div>
                </div>
                <input className="btn btn-success btn-raised" formNoValidate={true} type="submit" defaultValue="Add Character" />
              </div>
            </Formsy.Form>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
});
//
module.exports = AddCharacter
