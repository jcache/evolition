var EventEmitter  = require('events').EventEmitter;
var evConstants   = require('../_constants/constants');
var evDispatcher  = require('../_dispatcher/dispatcher');
var objectAssign  = require('object-assign');
var CHANGE_EVENT  = 'change';

var characters    = [];
var character   = ev_characters('characters').find({id: 1})
var characterView = '';
var login = true;
var activeView = '';

var showLogin = function (flag) {
  login = flag;
};

var changeView = function (view) {
  activeView = view;
};

var fetchCharacters = function () {
  characters = ev_characters.object.characters
};

var editCharacter = function (character) {
  // alert(JSON.stringify(
  //   ev_characters('characters')
  //
  //   ev_characters('characters')
  // .chain()
  // .find({ id: "1" })
  // .assign({ title: 'hi!'})
  // .value()
  // ));
  ev_characters('characters').chain().find({ id: character.id }).assign(character).value();
};

var setSelectedCharacter = function (c) {
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
evDispatcher.register((payload) => {
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

    case evConstants.EDIT_CHARACTER:
      editCharacter(action.data);
      evStore.emit(CHANGE_EVENT);
      break;

    case evConstants.FETCH_CHARACTERS:
      fetchCharacters();
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
