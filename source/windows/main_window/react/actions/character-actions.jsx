var CharacterDispatcher = require('../dispatcher/character-dispatcher.jsx');
var CharacterConstants  = require('../constants/character-constants.jsx');

var CharacterActions = {
  fetchCharacters: function(){
    CharacterDispatcher.handleAction({
      actionType: CharacterConstants.FETCH_CHARACTERS,
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
  setFilteredText: function(string){
    CharacterDispatcher.handleAction({
      actionType: CharacterConstants.FILTER_TEXT,
      data: string
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
  toggleCharacters: function(flag){
    var datas = flag == "true" ? false : true;
    CharacterDispatcher.handleAction({
      actionType: CharacterConstants.LIST_STATE,
      data: datas
    });
  },
  createCharacter: function(character){
    CharacterDispatcher.handleAction({
      actionType: CharacterConstants.CREATE_CHARACTER,
      data: character
    });
  }
};

module.exports = CharacterActions;
