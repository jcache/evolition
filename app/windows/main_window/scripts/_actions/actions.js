var evDispatcher = require('../_dispatcher/dispatcher.js');
var evConstants  = require('../_constants/constants.js');


var evActions = {
  showLogin: function(boo){
    evDispatcher.handleAction({
      actionType: evConstants.SHOW_LOGIN,
      data: boo
    });
  },
}


module.exports = evActions;
