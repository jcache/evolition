import {
  LEFT_NAV_SHOWN
} from '../constants'

const initialState = {
  visible_flag: false
}

export default function update(state = initialState, action) {
  switch (action.type) {
    case LEFT_NAV_SHOWN:
      return { visible_flag: action.visible}
    default:
      return state
  }
}
