import { LEFT_NAV_SHOWN, TOGGLE_SHOW } from '../_constants'


export function LeftNavShown(n) {
  return {
    type: LEFT_NAV_SHOWN,
    visible: n
  }
}

export function ToggleShown(state) {
  return {
    type: TOGGLE_SHOW
  }
}
