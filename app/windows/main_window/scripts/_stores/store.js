var evConstants  = require('../_constants/constants.js');
var evDispatcher  = require('../_dispatcher/dispatcher.js');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var characters = {}
var login_shown = true

var fetch_all_characters = function(){
  characters = {}
}
var show_login = function(v){
  console.log('show_login', v);
  login_shown = v
}

var evStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getLoginShown: function(){
    return login_shown;
  },
});

evDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case evConstants.FETCH_CHARACTERS:
      fetch_all_characters();
      evStore.emit(CHANGE_EVENT);
      break;
    case evConstants.SHOW_LOGIN:
      show_login(action.data);
      evStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = evStore;
