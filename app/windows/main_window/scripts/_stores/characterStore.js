var alt = require('../alt');
var CharacterActions = require('../_actions/characterActions');

class CharacterStore {
  constructor() {
    this.locations = [];

    this.bindListeners({
      handleUpdateCharacter: CharacterActions.UPDATE_CHARACTER,
    });
  }

  handleUpdateCharacter(character) {
    this.character = character;
  }
}

module.exports = alt.createStore(CharacterStore, 'CharacterStore');
