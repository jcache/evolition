var CharacterStore = require('../stores/character-store.jsx');
var CharacterConstants  = require('../constants/character-constants.jsx');
var CharacterDispatcher  = require('../dispatcher/character-dispatcher.jsx');

var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var selected_character = {};
var selected_view = {};
var characters = [];
var views = [];
// RETURNS ALL CHARACTERS
var fetch_all_characters = function(){
  characters = ev_characters.object.characters
}
// RETURNS ALL VIEWS
var fetch_views = function(){
  views = ev_characters.object.views
}
// SETS SELECTED VIEW
var set_selected_view = function(view){
  selected_view = ev_characters('selected_view').chain().find({ id: 1 }).assign(view).value();
}
var change_view = function(view){
  // selected_view = ev_characters('selected_view').chain().find({ id: 1 }).assign(view).value();
  selected_view = ev_characters('views').find({ view_name: view });
  console.log(selected_view);
}
// SELECTS CHARACTER
var selectCharacter = function(character){
  selected_character = character
}
// CREATES CHARACTER
var createCharacter = function(character){
  ev_characters('characters').insert(character).id
}
// REMOVES CHARACTER
var removeCharacter = function(character){
  ev_characters('characters').remove(character);
}
// EDITS CHARACTER
var editCharacter = function(character){
  ev_characters('characters').chain().find({ id: character.id }).assign(character).value();
}

var CharacterStore = objectAssign({}, EventEmitter.prototype, {

  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  fetchViews: function(){
    return views;
  },
  getSelectedView: function(){
    return selected_view;
  },
  getAllCharacters: function(){
    return characters;
  },
  getSelectedCharacter: function(){
    return selected_character;
  }
});

CharacterDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){

    case CharacterConstants.FETCH_CHARACTERS:
      fetch_all_characters();
      CharacterStore.emit(CHANGE_EVENT);
      break;
    case CharacterConstants.FETCH_VIEWS:
      fetch_views();
      CharacterStore.emit(CHANGE_EVENT);
      break;
    case CharacterConstants.CHANGE_VIEW:
      change_view(action.data);
      CharacterStore.emit(CHANGE_EVENT);
      break;
    case CharacterConstants.SET_SELECTED_VIEW:
      set_selected_view(action.data);
      CharacterStore.emit(CHANGE_EVENT);
      break;
    case CharacterConstants.CREATE_CHARACTER:
      createCharacter(action.data);
      CharacterStore.emit(CHANGE_EVENT);
      break;
    case CharacterConstants.SELECT_CHARACTER:
      selectCharacter(action.data);
      CharacterStore.emit(CHANGE_EVENT);
      break;
    case CharacterConstants.EDIT_CHARACTER:
      editCharacter(action.data);
      CharacterStore.emit(CHANGE_EVENT);
      break;
    case CharacterConstants.VIEW_CHARACTER:
      viewCharacter(action.data);
      CharacterStore.emit(CHANGE_EVENT);
      break;
    case CharacterConstants.REMOVE_CHARACTER:
      removeCharacter(action.data);
      CharacterStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = CharacterStore;
