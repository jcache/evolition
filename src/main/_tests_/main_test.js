/*  In render process Tests */

import React from 'react';
import { expect } from 'chai';
import {createRenderer} from 'react-addons-test-utils';
import App  from '../project/app';

describe('Main app', () => {

  it('App wrapper is available', (done) => {
    this.timeout(5000);
    let renderer = createRenderer();
    renderer.render(<App />);
    let appWrapper = renderer.getRenderOutput();

    expect(appWrapper.type).to.equal('div');
    done();
  });

  it('should first load login view');
  it('should have a login form on the initial view');
  it('should be able to login with an email and password');
  it('should resize window when logged in');
});
