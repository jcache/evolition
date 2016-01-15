var CharacterStore = require('../stores/character-store.jsx');
var CharacterConstants  = require('../constants/character-constants.jsx');
var CharacterDispatcher  = require('../dispatcher/character-dispatcher.jsx');

var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var selected_character = {};
var characters = [];
// RETURNS ALL CHARACTERS
var fetch_all_characters = function(){
  characters = ev_characters.object.characters
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
  ev_characters('characters').chain().find({ id: character.data.id }).assign(character.data).value();
}

var CharacterStore = objectAssign({}, EventEmitter.prototype, {

  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
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
