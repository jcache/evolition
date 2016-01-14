var CharacterStore = require('../stores/character-store.jsx');
var CharacterConstants  = require('../constants/character-constants.jsx');
var CharacterDispatcher  = require('../dispatcher/character-dispatcher.jsx');

var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var selected_character = {};
var characters = [];

var fetch_all_characters = function(){
  characters = ev_characters.object.characters
}

var selectCharacter = function(character){
  selected_character = character.data
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
    case CharacterConstants.SELECT_CHARACTER:
      selectCharacter(action);
      CharacterStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = CharacterStore;
