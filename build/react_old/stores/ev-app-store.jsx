"use strict";

import evDispatcher  from '../dispatcher/ev-dispatcher.jsx';
import { evConstants } from '../constants/ev-constants.jsx';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

var character_store = [];
var current_page = "default";
var selected_character_data = {};

let _store = {
  list: [],
  editing: false,
};

var focused_character = ev_characters('characters').first({});

var change_view = function(view){
  current_page = view.data;
  ev_characters('settings').chain().find({id:1}).assign({selected_view: current_page}).value();
};

var focus_character = function(character){
  focused_character = ev_characters('characters').find({id: character.action.data.id})
};

var selected_character = function(character){
  console.log(character)
  selected_character_data = ev_characters('characters').find({id: character.action.data.id})
};

var addCharacter = function(character){
  ev_characters('characters').insert(character).id
};

var updateCharacter = function(character){
  ev_characters('characters').chain().find({ id: character.id }).assign(character).value();
};

var set_characters = function(characters){
  console.log("setting characters: ", characters)
  character_store = characters;
};
var removeCharacter = function(character){
  ev_characters('characters').remove(character);
  character_store = ev_characters.object.characters;
}

class ApplicationStoreClass extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }
  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
  getAllCharacters() {
    return _store;
  }
  getStats(){
    return ev_gamesystem.object.game_systems[0].stat_layout;
  }
  getSelectedView(){
    return current_page;
  }
  getSelectedCharacter(){
    return focused_character;
  }
  getTheSelectedCharacter(){
    return selected_character_data;
  }
}

const evApplicationStore = new ApplicationStoreClass();

evDispatcher.register((payload) => {
  const action = payload.action;
  switch (action.actionType) {
    case evConstants.CHANGE_VIEW:
      change_view(action);
      evApplicationStore.emit(CHANGE_EVENT);
      break;
    case evConstants.FOCUS_CHARACTER:
      focus_character(payload);
      evApplicationStore.emit(CHANGE_EVENT);
      break;
    case evConstants.SELECTED_CHARACTER:
      selected_character(payload);
      evApplicationStore.emit(CHANGE_EVENT);
      break;
    case evConstants.UPDATE_CHARACTER:
      updateCharacter(action.data);
      evApplicationStore.emit(CHANGE_EVENT);
      break;
    case evConstants.REMOVE_CHARACTER:
      removeCharacter(action.data);
      evApplicationStore.emit(CHANGE_EVENT);
      break;
    case evConstants.ADD_CHARACTER:
      addCharacter(action.data);
      evApplicationStore.emit(CHANGE_EVENT);
      break;
    case evConstants.RECEIVE_CHARACTER_DATA:
      set_characters(action.data);
      evApplicationStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

export default evApplicationStore;
