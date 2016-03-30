var evDispatcher = require('../_dispatcher/dispatcher');
var evConstants  = require('../_constants/constants');


var evActions = {
  showLogin: function (state) {
    evDispatcher.handleAction({
      actionType: evConstants.SHOW_LOGIN,
      data: state
    })
  },
  changeView: function (cmd) {
    evDispatcher.handleAction({
      actionType: evConstants.CHANGE_VIEW,
      data: cmd
    })
  },

};

module.exports = evActions;
