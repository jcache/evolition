var alt = require('../alt');

class CharacterActions {
  updateCharacter(character) {
    return character;
  }

  addCharacter(character) {
    return character;
  }

  deleteCharacter(character) {
    return true;
  }
}

const characterActions = alt.createActions(CharacterActions);
