var EventEmitter  = require('events').EventEmitter;
var evConstants = require('../_constants/constants');
var evDispatcher = require('../_dispatcher/dispatcher');
var characters = require('./seed/characters.js');
var objectAssign  = require('object-assign');
var CHANGE_EVENT  = 'change';


var character = characters[0];
var characterView = '';

var login = true;

var activeView = '';

var showLogin = function (flag) {
  login = flag;
};

var changeView = function (view) {
  activeView = view;
};

var setSelectedCharacter = function (c) {
  console.log(">>>>>1", c);
  character = c;
};

var setCharacterView = function (view) {
  characterView = view;
};

// FLUX STORE (todo: remove this crap)
var evStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function (cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function (cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  // (

  getLoginShown: function () {
    return login;
  },

  getSelectedCharacter: function () {
    return character;
  },

  getCharacters: function () {
    return characters;
  },

  getActiveView: function () {
    return activeView;
  },

  getCharacterView: function () {
    return characterView;
  },

  // )

});

// FLUX ACTION EMITTERS SWITCH STATEMENT (todo: remove this crap)
evDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case evConstants.SHOW_LOGIN:
      showLogin(action.data);
      evStore.emit(CHANGE_EVENT);
      break;

    case evConstants.CHANGE_VIEW:
      changeView(action.data);
      evStore.emit(CHANGE_EVENT);
      break;

    case evConstants.SET_SELECTED_CHARACTER:
      setSelectedCharacter(action.data);
      evStore.emit(CHANGE_EVENT);
      break;

    case evConstants.SET_CHARACTER_VIEW:
      setCharacterView(action.data);
      evStore.emit(CHANGE_EVENT);
      break;

    default:
      return true;
  }
});

module.exports = evStore;
