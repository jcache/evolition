var alt = require('../alt');
var CharacterActions = require('../_actions/characterActions');

class CharacterStore {
  constructor() {
    this.bindAction(CharacterActions.addCharacter, this.onAddCharacter);
    this.bindAction(CharacterActions.updateCharacter, this.onUpdateCharacter);
    this.bindAction(CharacterActions.deleteCharacter, this.onDeleteCharacter);

    this.bindListeners({
      handleUpdateCharacter: CharacterActions.UPDATE_CHARACTER,
    });
  }

  onAddCharacter(obj) {
    const character = obj;
    this.setState({ character });
  }

  onUpdateCharacter(obj) {
    const { character_name } = obj;
    this.setState({ character_name });
  }

  onDeleteCharacter(obj) {
    const character = obj;
    this.setState({ character_name });
  }

}

const characterStore = alt.createStore(CharacterStore);
