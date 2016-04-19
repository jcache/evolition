'use strict';

import React from 'react';
let { PropTypes } = React;

const evStore = require('../../../../_stores/evStore.js');
const evActions = require('../../../../_actions/actions.js');

import {Link, Route} from 'react-router';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

var Input     = FRC.Input;
var File      = FRC.File;
var Select    = FRC.Select;
var Textarea  = FRC.Textarea;

class CharacterAdd extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      canSubmit: false,
      validatePristine: false,
      disabled: false,
      saved:  false,
      character: {},
      layout: 'vertical',
    };
    this._onChange = this._onChange.bind(this);
    this.changeOption = this.changeOption.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }

  enableButton () {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton () {
    this.setState({
      canSubmit: false,
    });
  }

  componentWillMount () {
    evStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    evStore.removeChangeListener(this._onChange);
  }

  changeOption (name, value) {
    var newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  submitForm (data) {
    evActions.addCharacter(data);
  }

  _onChange () {
    this.setState({
      saved:  true,
    });
  }

  render () {
    var formClassName = '';
    var sharedProps = {
      layout: this.state.layout,
      validatePristine: this.state.validatePristine,
      labelClassName: 'control-label',
      disabled: this.state.disabled
    };
    if (this.state.layout === 'horizontal') {
      formClassName = 'form-horizontal';
    }
    let { character } = this.state;
    var image_src = 'ev://shared/images/darths.png';
    var divStyle = {
      backgroundImage: 'url(' + image_src + ')',
      WebkitTransition: 'all', // note the capital 'W' here
    };
    return (
      <div className='app-main-view'>
        <div className='bodyHeader'>
          <div className='headTitle'>
            <h2>Add a new character</h2>
          </div>

          <div className='headController'>
            <ul>
              <li><a href='#'>Edit</a></li>
              <li><a href='#'>View</a></li>
            </ul>
          </div>
        </div>

          <div className='bodyContainer'>
            <Formsy.Form className={formClassName} onValid={this.enableButton} onValidSubmit={this.submitForm} onInvalid={this.disableButton} ref="form">
              <div className='row'>
                <div className='col-xs-3 col-xs-push-9 image-container'>
                  <div className='character-profile-pic' style={divStyle}>
                  </div>
                </div>
                <div className='col-xs-9 col-xs-pull-3'>
                  <div className='row'>
                    <Input {...sharedProps}
                      rowClassName="col-xs-6 form-group is-empty no-space"
                      name="character_name"
                      value={character.character_name}
                      label="Full Name"
                      type="text"
                    />
                    <div className='col-xs-4 form-group  is-empty no-space'>
                      <label className='control-label'>Race</label>
                      <select className='form-control'>
                        <option> - - </option>
                        <option>Human</option>
                        <option>Elven</option>
                        <option>Dwarven</option>
                      </select>
                    </div>
                    <div className='col-xs-2 form-group is-empty no-space'>
                      <label className='control-label'>Gender</label>
                      <select className='form-control'>
                        <option>Female</option>
                        <option>Male</option>
                      </select>
                    </div>
                  </div>
                  <div className='row'>
                    <Input {...sharedProps} rowClassName="col-xs-2 form-group is-empty no-space" name="age" value={character.age} label="Age" type="number" required/>
                    <Input {...sharedProps} rowClassName="col-xs-2 form-group is-empty no-space" name="height" value={character.height} label="Height" type="text" />
                    <Input {...sharedProps} rowClassName="col-xs-2 form-group is-empty no-space" name="weight" value={character.weight} label="Weight" type="text" />
                    <div className='col-xs-6 form-group is-empty no-space'>
                      <label className='control-label'>Class</label>
                      <select className='form-control'>
                        <option> - - </option>
                        <option>Barbarian</option>
                        <option>Bard</option>
                        <option>Cleric</option>
                        <option>Druid</option>
                        <option>Fighter</option>
                        <option>Monk</option>
                        <option>Paladin</option>
                        <option>Ranger</option>
                        <option>Sorcerer</option>
                        <option>Wizard</option>
                      </select>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-xs-4 form-group is-empty no-space'>
                      <label className='control-label'>Alignment</label>
                      <select className='form-control'>
                        <option> - - </option>
                        <option>Lawful Good</option>
                        <option>Neutral Good</option>
                        <option>Chaotic Good</option>
                        <option>Lawful Neutral</option>
                        <option>Neutral</option>
                        <option>Chaotic Neutral</option>
                        <option>Lawful Evil</option>
                        <option>Neutral Evil</option>
                        <option>Chaotic Evil</option>
                      </select>
                    </div>
                    <Input {...sharedProps} rowClassName="col-xs-4 form-group is-empty no-space" name="diety" value={character.diety} label="Diety" type="text" />
                    <Input {...sharedProps} rowClassName="col-xs-4 form-group is-empty no-space" name="level" value={character.level} label="Level" type="number" required />
                  </div>
                </div>
              </div>
              <div className='row'>
                <input type="submit" className="btn btn-raised btn-success" disabled={!this.state.canSubmit}  defaultValue="Add Character"/>
              </div>
            </Formsy.Form>
          </div>
      </div>
    );
  }
}

module.exports = CharacterAdd;
