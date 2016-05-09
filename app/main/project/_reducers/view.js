import {
  CHANGE_VIEW,
  TOGGLE_LEFT_MENU
} from '../_constants'

const initialState = {
  menuVisibility: 'shown',
}

export default function update(state = initialState, action) {
  if(action.type === CHANGE_VIEW) {
    return { menuVisibility: action.menuVisibility }
  } else if(action.type === TOGGLE_LEFT_MENU) {
    return { left_menu_visible: action.left_menu_visible }
  }
  return state
}
