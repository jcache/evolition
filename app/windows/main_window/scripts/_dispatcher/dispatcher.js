var Dispatcher = require('flux').Dispatcher;
var evDispatcher = new Dispatcher();
var CHANGE_EVENT = 'change';

evDispatcher.handleAction = function(action){
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

evDispatcher.handleServerAction = function(action) {
  this.dispatch({
    source: 'SERVER_ACTION',
    action: action
  });
}

module.exports = evDispatcher;
