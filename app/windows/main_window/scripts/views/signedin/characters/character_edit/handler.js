'use strict';

import React from 'react';
let { PropTypes } = React;
const evStore = require('../../../../_stores/evStore.js');
import {Link, Route} from 'react-router';

class CharacterEdit extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      character: evStore.getSelectedCharacter(),
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    evStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    evStore.removeChangeListener(this._onChange);
  }

  _onChange () {
    this.setState({
      character: evStore.getSelectedCharacter(),
    });
  }

  render () {
    let {character} = this.state;
    var image_src = 'ev://shared/images/darths.png';
    var divStyle = {
      backgroundImage: 'url(' + image_src + ')',
      WebkitTransition: 'all', // note the capital 'W' here
    };
    return (
      <div className='app-main-view'>

        <div className='bodyHeader'>
          <div className='headTitle'>
            <h2>Edit your Character {character.id}</h2>
          </div>
          <div className='headController'>
            <ul>
              <li><Link to={'/signedin/characters/view/' + character.id} activeClassName='character-view-link' activeClassName='active'>View</Link></li>
            </ul>
          </div>
        </div>

        <div className='bodyContainer'>
          <form>
            <div className='row'>
              <div className='col-xs-3 col-xs-push-9 image-container'>
                <div className='character-profile-pic' style={divStyle}>
                </div>
              </div>
              <div className='col-xs-9 col-xs-pull-3'>
                <div className='row'>
                  <div className='col-xs-6 form-group  is-empty no-space'>
                    <label className='control-label'>Characer Name</label>
                    <input type="text" className="form-control" />
                  </div>

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

                  <div className='col-xs-2 form-group is-empty no-space'>
                    <label className='control-label'>Age</label>
                    <input type="text" className="form-control"/>
                  </div>

                  <div className='col-xs-2 form-group is-empty no-space'>
                    <label className='control-label'>Height</label>
                    <input type="text" className="form-control"/>
                  </div>

                  <div className='col-xs-2 form-group is-empty no-space'>
                    <label className='control-label'>Weight</label>
                    <input type="text" className="form-control" />
                  </div>

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

                  <div className='col-xs-4 form-group is-empty no-space'>
                    <label className='control-label'>Diety</label>
                    <input type="text" className="form-control"/>
                  </div>

                  <div className='col-xs-4 form-group is-empty no-space'>
                    <label className='control-label'>Level</label>
                    <input type="text" className="form-control"/>
                  </div>

                </div>

              </div>
            </div>

            <div className='row'>
              <button type="submit" className="btn btn-default">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

module.exports = CharacterEdit;
