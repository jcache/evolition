var evDispatcher = require('../_dispatcher/dispatcher');
var evConstants  = require('../_constants/constants');


var evActions = {
  showLogin: function (state) {
    evDispatcher.handleAction({
      actionType: evConstants.SHOW_LOGIN,
      data: state
    })
  },

};

module.exports = evActions;
