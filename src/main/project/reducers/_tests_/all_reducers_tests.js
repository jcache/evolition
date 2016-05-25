import React from 'react';
import { expect } from 'chai';
import reducer from '../'
import * as actions from '../../actions/characterActions';
import * as types from '../../constants';

describe('Character reducer', () => {
  console.log(require('util').inspect(reducers, { depth: null }));
  it('should return the initial state', () => {
    expect(
      reducers(undefined, {})
    ).deep.to.equal([
      {
        type:types.LOAD_CHARACTERS,
        characters: []
      }
    ]);
  })
});
