var EventEmitter  = require('events').EventEmitter;
var evConstants = require('../_constants/constants');
var evDispatcher = require('../_dispatcher/dispatcher');
var characters = require('./seed/characters.js');
var objectAssign  = require('object-assign');
var CHANGE_EVENT  = 'change';
console.log(characters);
var selected_character_id = 1;

var login = true;

var active_view = '';

var show_login = function(flag){
  login = flag;
}

var change_view = function(view){
  active_view = view;
}

var set_selected_character = function(id){
  selected_character_id = id;
}


var evStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },

  getLoginShown: function() {
    return login;
  },
  getSelectedCharacter: function() {
    return selected_character_id;
  },
  getCharacters: function() {
    return characters;
  },

  getActiveView: function() {
    return active_view;
  },
});

evDispatcher.register(function(payload){
  var action = payload.action;

  switch (action.actionType) {

    case evConstants.SHOW_LOGIN:
      show_login(action.data);
      evStore.emit(CHANGE_EVENT);
      break;

    case evConstants.CHANGE_VIEW:
      change_view(action.data);
      evStore.emit(CHANGE_EVENT);
      break;

    case evConstants.SET_SELECTED_CHARACTER:
      set_selected_character(action.data);
      evStore.emit(CHANGE_EVENT);
      break;

    default:
      return true;
  }
});


module.exports = evStore;
