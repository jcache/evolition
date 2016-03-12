'use strict';

import React from 'react';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import CharacterStore from '../../stores/character-store.jsx';
import CharacterActions from '../../actions/character-actions.jsx';

let {Input} = FRC;

class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      filteredText: ''
    }
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    CharacterStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    CharacterStore.removeChangeListener(this._onChange);
  }

  filterTrigger(e) {
    CharacterActions.setFilteredText(e.target.value);
  }

  stateUpdate(value) {
    this.setState({
      filterText: CharacterStore.getFilteredText()
    });
  }

  _onChange() {
    this.setState({
      filteredText: CharacterStore.getFilteredText()
    })
  }

  render(){
    return (
      <form>
        <div className='form-group row form-group-lg label-placeholder character-search is-empty'>
          <label className='control-label col-sm-3'><span>Search</span></label>
          <div className='col-sm-12 s-group'>
            <input className='form-control' value={this.state.filterText} name='search' type='search' ref='filterInput' onChange={this.filterTrigger}/>
          </div>
        </div>
      </form>
    )
  }
};


module.exports = Search
