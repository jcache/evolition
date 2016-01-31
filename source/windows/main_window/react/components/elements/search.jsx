  import React from 'react';
  import Formsy from 'formsy-react';
  import FRC from 'formsy-react-components';
  import CharacterStore from '../../stores/character-store.jsx';
  import CharacterActions from '../../actions/character-actions.jsx';
  var Input     = FRC.Input;

  var Search = React.createClass({
    getInitialState: function(){
      return{
        filteredText: ''
      }
    },
    componentWillMount: function(){
      CharacterStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
      CharacterStore.removeChangeListener(this._onChange);
    },
    filterTrigger: function(event) {
      CharacterActions.setFilteredText(event.target.value);
    },
    stateUpdate: function(value){
      this.setState({
        filterText: CharacterStore.getFilteredText()
      });
    },
    _onChange: function(){
      this.setState({
        filteredText: CharacterStore.getFilteredText()
      })
    },
    render: function(){

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
  });

  module.exports = Search
