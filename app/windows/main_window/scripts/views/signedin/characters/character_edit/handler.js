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
                  <div className='col-xs-4 form-group label-floating is-empty'>
                    <label className='control-label'>Characer Name</label>
                    <input type="text" className="form-control" />
                    <span className='material-input'></span>
                  </div>

                  <div className='col-xs-4 form-group label-floating is-empty'>
                    <label className='control-label'>Age</label>
                    <select className='form-control'>
                      <option></option>
                      <option>selection #2</option>
                      <option>selection #3</option>
                    </select>
                  </div>

                  <div className='col-xs-4 form-group label-floating is-empty'>
                    <label className='control-label'>Class</label>
                    <input type="text" className="form-control"/>
                    <span className='material-input'></span>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-xs-3 form-group label-floating is-empty'> 
                    <label className='control-label'>Age</label>
                    <select className='form-control'>
                      <option></option>
                      <option>selection #2</option>
                      <option>selection #3</option>
                    </select>
                  </div>

                  <div className='col-xs-3 form-group label-floating is-empty'>
                    <label className='control-label'>Age</label>
                    <input type="text" className="form-control"/>
                    <span className='material-input'></span>
                  </div>

                  <div className='col-xs-3 form-group label-floating is-empty'>
                    <label className='control-label'>Height</label>
                    <input type="text" className="form-control"/>
                    <span className='material-input'></span>
                  </div>

                  <div className='col-xs-3 form-group label-floating is-empty'>
                    <label className='control-label'>Weight</label>
                    <input type="text" className="form-control" />
                    <span className='material-input'></span>
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
