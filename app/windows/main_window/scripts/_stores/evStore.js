var EventEmitter  = require('events').EventEmitter;
var evConstants = require('../_constants/constants');
var evDispatcher = require('../_dispatcher/dispatcher');
var objectAssign  = require('object-assign');
var CHANGE_EVENT  = 'change';
var login = true;

var show_login = function(flag){
  login = flag;
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
});

evDispatcher.register(function(payload){
  var action = payload.action;

  switch (action.actionType) {

    case evConstants.SHOW_LOGIN:
      show_login(action.data);
      evStore.emit(CHANGE_EVENT);
      break;

    default:
      return true;
  }
});


module.exports = evStore;
