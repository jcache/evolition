var CharacterDispatcher = require('../dispatcher/character-dispatcher.jsx');
var CharacterConstants  = require('../constants/character-constants.jsx');

var CharacterActions = {
  fetchCharacters: function(){
    CharacterDispatcher.handleAction({
      actionType: CharacterConstants.FETCH_CHARACTERS,
    });
  },
  toggleCharacters: function(flag){
    CharacterDispatcher.handleAction({
      actionType: CharacterConstants.TOGGLE_CHARACTERS,
      data: flag
    });
  },
  fetchViews: function(){
    CharacterDispatcher.handleAction({
      actionType: CharacterConstants.FETCH_VIEWS,
    });
  },
  setSelectedView: function(){
    CharacterDispatcher.handleAction({
      actionType: CharacterConstants.SET_SELECTED_VIEW,
    });
  },
  changeView: function(view){
    CharacterDispatcher.handleAction({
      actionType: CharacterConstants.CHANGE_VIEW,
      data: view
    });
  },
  selectCharacter: function(character){
    CharacterDispatcher.handleAction({
      actionType: CharacterConstants.SELECT_CHARACTER,
      data: character
    });
  },
  editCharacter: function(character){
    CharacterDispatcher.handleAction({
      actionType: CharacterConstants.EDIT_CHARACTER,
      data: character
    });
  },
  viewCharacter: function(character){
    CharacterDispatcher.handleAction({
      actionType: CharacterConstants.VIEW_CHARACTER,
      data: character
    });
  },
  removeCharacter: function(character){
    CharacterDispatcher.handleAction({
      actionType: CharacterConstants.REMOVE_CHARACTER,
      data: character
    });
  },
  createCharacter: function(character){
    CharacterDispatcher.handleAction({
      actionType: CharacterConstants.CREATE_CHARACTER,
      data: character
    });
  },

  // changeView: function(view, character){
  //   CharacterDispatcher.handleAction({
  //     actionType: CharacterConstants.CHANGE_VIEW,
  //     data: view
  //   });
  // },
  // addCharacter: function(character){
  //   CharacterDispatcher.handleAction({
  //     actionType: CharacterConstants.ADD_CHARACTER,
  //     data: character
  //   });
  // },
  // removeCharacter: function(character){
  //   CharacterDispatcher.handleAction({
  //     actionType: CharacterConstants.REMOVE_CHARACTER,
  //     data: character
  //   })
  // }
};

module.exports = CharacterActions;
