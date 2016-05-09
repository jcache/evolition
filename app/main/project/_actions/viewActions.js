import { LEFT_NAV_SHOWN } from '../_constants'


export function LeftNavShown(n) {
  return {
    type: LEFT_NAV_SHOWN,
    visible: n
  }
}
