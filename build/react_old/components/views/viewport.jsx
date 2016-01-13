"use strict";

import React from 'react';
import DefaultView from './default-view.jsx';
import CharacterView from './character-view.jsx';
import CharacterAdd from './character-add.jsx';
import CharacterEdit from './character-edit.jsx';
import evApplicationStore from '../../stores/ev-app-store.jsx';

import {changeView,focusedCharacter,removeCharacter,selectedCharacter} from '../../actions/ev-actions.jsx';

class Viewport extends React.Component {
  constructor(props){
    super(props);
    this._onChange = this._onChange.bind(this);

    this.state = {
      selected: evApplicationStore.getSelectedView()
    };
  }

  componentWillMount(){
    evApplicationStore.addChangeListener(this._onChange);
  }

  componentWillUnmount(){
    evApplicationStore.removeChangeListener(this._onChange);
  }

  _onChange(){
    this.state = {
      selected: evApplicationStore.getSelectedView()
    }
  }

  render(){

    console.log(this.state.selected);

    let view;
    switch (this.state.selected) {
      case "default":
        view = <DefaultView />
        break;
      case "character_form":
        view = <CharacterForm />
        break;
      case "character_edit":
        view = <CharacterEdit />
        break;
      case "character_view":
        view = <CharacterView />
        break;
      case "character_add":
        view = <CharacterAdd />
        break;
      default:

    }
    return (
      <div className='col-xs-8' id='viewport'>
        {view}
      </div>
    )
  }
};

module.exports = Viewport
