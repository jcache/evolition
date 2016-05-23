/*  In Main process Tests */

import React from 'react';
import { Application } from 'spectron';

import { expect } from 'chai';
var assert = require('assert')

describe('application launch', function () {
  this.timeout(10000)

  beforeEach(function () {
    this.app = new Application({
      path: './build/evolition-darwin-x64/evolition.app/Contents/MacOS/evolition'
    })
    return this.app.start()
  })

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('shows an initial window', function () {
    return this.app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1)
    })
  })
})
