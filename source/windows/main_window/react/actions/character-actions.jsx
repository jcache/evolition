var CharacterDispatcher = require('../dispatcher/character-dispatcher.jsx');
var CharacterConstants  = require('../constants/character-constants.jsx');

var CharacterActions = {
  selectCharacter: function(character){
    CharacterDispatcher.handleAction({
      actionType: CharacterConstants.SELECT_CHARACTER,
      data: character
    });
  },
  fetchCharacters: function(){
    CharacterDispatcher.handleAction({
      actionType: CharacterConstants.FETCH_CHARACTERS,
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
