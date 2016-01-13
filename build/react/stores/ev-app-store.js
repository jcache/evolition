var evDispatcher = require('../dispatcher/ev-dispatcher.jsx');
var evConstants  = require('../constants/ev-constants.jsx');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var datastore = [];
var current_page = "";
var selected_character_data = {};

var focused_character = ev_characters('characters').first({});

console.log(ev_gamesystem('game_systems').first({}));

var change_view = function(view){
  current_page = view.action.data;
  ev_characters('settings').chain().find({id:1}).assign({selected_view: current_page}).value();
};

var focus_character = function(character){
  focused_character = ev_characters('characters').find({id: character.action.data.id})
};

var selected_character = function(character){
  selected_character_data = ev_characters('characters').find({id: character.action.data.id})
};

var addCharacter = function(character){
  ev_characters('characters').insert(character).id
};

var updateCharacter = function(character){
  ev_characters('characters').chain().find({ id: character.id }).assign(character).value();
};

var get_characters = function(){
  datastore.push({})
};
var removeCharacter = function(character){
  ev_characters('characters').remove(character);
}
var evApplicationStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getStats: function(){
    return ev_gamesystem.object.game_systems[0].stat_layout;
  },
  getSelectedView: function(){
    return ev_characters.object.settings[0].selected_view;
  },
  getSelectedCharacter: function(){
    return focused_character;
  },
  getTheSelectedCharacter: function(){
    return selected_character_data;
  }
});

evDispatcher.register(function(payload){
  var action = payload.action;

  switch(action.actionType){
    case evConstants.CHANGE_VIEW:
      change_view(payload);
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
    default:
      return true;
  }
});


module.exports = evApplicationStore;
