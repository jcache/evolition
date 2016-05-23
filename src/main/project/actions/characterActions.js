
import {
  LOAD_CHARACTERS,
  ADD_CHARACTER,
  SELECT_CHARACTER,
  EDIT_CHARACTER
} from '../constants';

export function LoadCharacters () {
  return {
    type: LOAD_CHARACTERS,
    characters: [
      {id:1},
      {id:2},
      {id:3},
      {id:4},
      {id:5},
      {id:6},
      {id:7},
      {id:8},
    ]
  };
}

export function editCharacter (character) {
  return {
    type: EDIT_CHARACTER,
    character: character
  };
}

export function addCharacter (character) {
  return {
    type: ADD_CHARACTER,
    character: character
  };
}

export function selectCharacter (character) {
  return {
    type: SELECT_CHARACTER,
    character: character
  };
};



function fetchCharacters(subreddit) {
  return dispatch => {
    dispatch( requestPosts(subreddit) );
    return fetch('http://www.reddit.com/r/${subreddit}.json')
      .then( response => response.json() )
      .then( json => dispatch( receivePosts( subreddit, json ) ) );
  };
};
