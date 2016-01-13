var evActions      = require('../actions/ev-actions.jsx');

var EvAPI = {
  // Load mock product data from localStorage into ProductStore via Action
  getCharacterData: function() {
    console.log(ev_characters.object.characters);
    evActions.receiveCharacters(ev_characters.object.characters);
  }
};

module.exports = EvAPI
