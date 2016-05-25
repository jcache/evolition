/*  In render process Tests */

import React from 'react';
import { expect } from 'chai';
import {createRenderer} from 'react-addons-test-utils';
import App  from '../project/app-dev';

describe('Main app', () => {

  it('App wrapper is available', (done) => {
    let renderer = createRenderer();
    renderer.render(<App />);
    let appWrapper = renderer.getRenderOutput();
    // console.log(require('util').inspect(appWrapper.type, { depth: 3 }));

    expect(appWrapper.type).to.equal('div');
    done();
  });

  it('should first load login view');
  it('should have a login form on the initial view');
  it('should be able to login with an email and password');
  it('should resize window when logged in');
});
