import { LEFT_NAV_SHOWN } from '../constants'


export function LeftNavShown(n) {
  return {
    type: LEFT_NAV_SHOWN,
    visible: n
  }
}
