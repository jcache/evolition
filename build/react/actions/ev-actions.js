var evDispatcher = require('../dispatcher/ev-dispatcher.jsx');
var evConstants  = require('../constants/ev-constants.jsx');

var evActions = {
  selectedCharacter: function(character){
    evDispatcher.handleAction({
      actionType: evConstants.SELECTED_CHARACTER,
      data: character
    });
  },
  focusedCharacter: function(character){
    evDispatcher.handleAction({
      actionType: evConstants.FOCUS_CHARACTER,
      data: character
    });
  },
  changeView: function(view, character){
    evDispatcher.handleAction({
      actionType: evConstants.CHANGE_VIEW,
      data: view
    });
  },
  addCharacter: function(character){
    evDispatcher.handleAction({
      actionType: evConstants.ADD_CHARACTER,
      data: character
    });
  },
  updateCharacter: function(character){
    evDispatcher.handleAction({
      actionType: evConstants.UPDATE_CHARACTER,
      data: character
    });
  },
  removeCharacter: function(character){
    evDispatcher.handleAction({
      actionType: evConstants.REMOVE_CHARACTER,
      data: character
    })
  }
};

module.exports = evActions;
