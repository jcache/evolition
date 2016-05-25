import React from 'react';
import { expect } from 'chai';
import {createRenderer} from 'react-addons-test-utils';
import * as actions from '../../actions/characterActions';
import * as types from '../../constants';


describe("View CharacterList ", () => {
  // Action creator
  it('should create an action to load all characters', () => {
    const startingChars = {
      type: types.LOAD_CHARACTERS,
      characters: []
    };
    // TODO Should be modified to directly fetch real character list
    const resultChars = {
      type: types.LOAD_CHARACTERS,
      characters: [
        {id:1},
        {id:2},
        {id:3},
        {id:4},
        {id:5},
        {id:6},
        {id:7},
        {id:8}
      ]
    };
    expect(actions.LoadCharacters()).deep.to.equal(resultChars);

  });

  it('should add a character');
  it('should allow editing of a character');
  it('should allow selection of a character');

});
