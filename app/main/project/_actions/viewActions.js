import {
  CHANGE_VIEW,
  TOGGLE_LEFT_MENU,
} from '../_constants';

export function changeView(n) {
  return { type: CHANGE_VIEW, n }
}

export function toggleLeftMenu(n) {
  return { type: TOGGLE_LEFT_MENU, n }
}
