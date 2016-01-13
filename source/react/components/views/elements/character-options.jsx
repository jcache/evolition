import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

var CharacterOptions = React.createClass({
  getInitialState: function(){
    return{
      options: this.props.opts
    }
  },

  componentWillMount: function(){
    // evApplicationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    // evApplicationStore.removeChangeListener(this._onChange);
  },
  _viewCharacter: function(e){  },
  _editCharacter: function(e){  },
  _removeCharacter: function(e) {  },
  _onChange: function(){
    this.state = {
      options: this.props.options
    };
  },

  render: function(){
    let options = this.state.options
    let stylez = {"display": "none"}
    return(
      <div className='character-options' style={stylez}>
        <ul>
          <li className='view'>
            <a href='#' onClick={this._viewCharacter.bind(this)} data-view='character_view'>view</a>
          </li>
          <li className='change'>
            <a href='#' onClick={this._editCharacter.bind(this)} data-view='character_edit'>change</a>
          </li>
          <li className='remove'>
            <a href='#' onClick={this._removeCharacter.bind(this)}  data-view='character_edit'>remove</a>
          </li>
        </ul>
      </div>
    )
  }

});

module.exports = CharacterOptions
