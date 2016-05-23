import {
  LOAD_CHARACTERS,
  ADD_CHARACTER,
  SELECT_CHARACTER,
  EDIT_CHARACTER
} from '../constants'

const initialState = {
  characters: [],
  selected_character: {}
}

export default function update(state = initialState, action) {

  switch (action.type) {
    case LOAD_CHARACTERS:
      return { character: action.characters};

    case ADD_CHARACTER:
      return { character: action.character};

    case SELECT_CHARACTER:
      return { selected_character: action.character};

    case EDIT_CHARACTER:
      return { character: action.character};

    default:
      return state
  }
}
