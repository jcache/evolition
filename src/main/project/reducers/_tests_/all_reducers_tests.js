import React from 'react';
import { expect } from 'chai';
import reducer from '../'
import * as actions from '../../actions/characterActions';
import * as types from '../../constants';

describe('Character reducer', function() {
  console.log(require('util').inspect(reducers, { depth: null }));
  it('should return the initial state', function() {
    expect(
      reducers(undefined, {})
    ).deep.to.equal([
      {
        type:types.LOAD_CHARACTERS,
        characters: []
      }
    ]);
  });

  it('should add a character');
  it('should select a character');
  it('should edit a character');
});
