import {
  LEFT_NAV_SHOWN
} from '../_constants'

const initialState = {
  visible_flag: false
}

export default function update(state = initialState, action) {
  switch (action.type) {
    case LEFT_NAV_SHOWN:
      // console.log("dispatching action", action);
      return { visible_flag: action.visible}
    default:
      return state
  }
}
