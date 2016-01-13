"use strict";

import evDispatcher from '../dispatcher/ev-dispatcher.jsx';
import { evConstants } from '../constants/ev-constants.jsx';
import { EvAPI } from '../lib/evolition_api.jsx';

export function receiveCharacters(data) {
  evDispatcher.handleViewAction({
    actionType: evConstants.RECEIVE_CHARACTER_DATA,
    data: data
  });
}

export function selectedCharacter(character) {
  evDispatcher.handleViewAction({
    actionType: evConstants.SELECTED_CHARACTER,
    data: character
  });
}

export function focusedCharacter(character) {
  evDispatcher.handleViewAction({
    actionType: evConstants.FOCUS_CHARACTER,
    data: character
  });
}

export function getRandom() {
  evDispatcher.handleViewAction({
    actionType: evConstants.GET_RANDOM,
  });
}


export function changeView(view){
  console.log("everytime", view)
  evDispatcher.handleViewAction({
    actionType: evConstants.CHANGE_VIEW,
    data: view
  });
}

export function addCharacter(character){
  evDispatcher.handleViewAction({
    actionType: evConstants.ADD_CHARACTER,
    data: character
  });
}

export function updateCharacter(character){
  evDispatcher.handleViewAction({
    actionType: evConstants.UPDATE_CHARACTER,
    data: character
  });
}

export function removeCharacter(character){
  evDispatcher.handleViewAction({
    actionType: evConstants.REMOVE_CHARACTER,
    data: character
  })
}
