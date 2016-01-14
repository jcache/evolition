var Dispatcher = require('flux').Dispatcher;
var CharacterDispatcher = new Dispatcher();
var CHANGE_EVENT = 'change';

CharacterDispatcher.handleAction = function(action){
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = CharacterDispatcher;
