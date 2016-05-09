/*  In render process Tests */

import React from 'react';
import { expect } from 'chai';
import {createRenderer} from 'react-addons-test-utils';

import App  from './project/app';

describe('Main', () => {

  it('App wrapper is available', (done) => {
    let renderer = createRenderer();
    renderer.render(<App />);
    let appWrapper = renderer.getRenderOutput();
    // console.log(require('util').inspect(appWrapper.type, { depth: 3 }));

    expect(appWrapper.type).to.equal('div');
    done();
  });
});
