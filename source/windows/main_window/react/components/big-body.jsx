import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CharacterActions from '../actions/character-actions.jsx';
import CharacterStore from '../stores/character-store.jsx';
import CharacterList  from './character-list.jsx';
import Viewport from './viewport.jsx';

var BigBody = React.createClass({
  getInitialState: function(){
    return {
      isCharacterOpen: '',
    }
  },
  componentWillMount: function(){
    CharacterStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    CharacterStore.removeChangeListener(this._onChange);
  },
  _onCloseBigwin: function(){
    CharacterActions.toggleCharacters(!this.state.isCharacterOpen);
  },
  _onChange: function(){
    this.setState({
      isCharacterOpen: CharacterStore.getToggleCharacters()
    })
  },
  render: function(){
    return (
      <div className="flexbox-item app-big-body">
        <CharacterList />
        <div className={this.props.isCharacterOpen ? 'flexbox-container viewports isOpen' : 'flexbox-container viewports'}>
          <Viewport/>
        </div>
      </div>
    );
  }
});

module.exports = BigBody
