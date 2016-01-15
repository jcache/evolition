import React from 'react';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import StatList from '../elements/stat-list.jsx';
var CharacterActions  = require('../../actions/character-actions.jsx');
var CharacterStore  = require('../../stores/character-store.jsx');
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
var Input = FRC.Input;
//
var AddCharacter = React.createClass({
  getInitialState: function() {
    return {
      layout: 'vertical',
      validatePristine: false,
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
  submitForm: function(data) {
    CharacterActions.createCharacter(data);
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
              <div className='row'>
                <div className='col-xs-12'>
                  <div className='row'>
                    <div className='col-xs-2 stat-list'>
                      <StatList {...sharedProps} gamesystem="Rolemaster Evolition"/>
                    </div>
                    <div className='col-xs-10'>
                      <Input {...sharedProps} name="character_name" value="" label="Character Name:" type="text" placeholder="Character Name" help="This is a required text input." required />
                      <Input {...sharedProps} name="game_system_name" value="" label="Game System:" type="text" placeholder="Game System Name" help="This is a required text input." required />
                      <Input {...sharedProps} name="campaign_name" value="" label="Campaign:" type="text" help="This is a required text input." required />
                      <Input {...sharedProps} name="level" value="" label="level:" type="number" placeholder="23" help="This is a required text input." required />
                      <input className="btn btn-primary" formNoValidate={false} type="submit" defaultValue="Add Character" />
                    </div>
                  </div>
                </div>
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
