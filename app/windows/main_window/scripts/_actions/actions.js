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
  setSelectedCharacter: function (cmd) {
    evDispatcher.handleAction({
      actionType: evConstants.SET_SELECTED_CHARACTER,
      data: cmd
    })
  },
  setCharacterView: function (view_name) {
    evDispatcher.handleAction({
      actionType: evConstants.SET_CHARACTER_VIEW,
      data: view_name
    })
  },
  editCharacter: function (character) {
    evDispatcher.handleAction({
      actionType: evConstants.EDIT_CHARACTER,
      data: character
    })
  },
  fetchCharacters: function () {
    evDispatcher.handleAction({
      actionType: evConstants.FETCH_CHARACTERS
    })
  },

};

module.exports = evActions;
