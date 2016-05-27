/*  In Main process Tests */

import React from 'react';
import { Application } from 'spectron';
import { ipcMain } from 'electron';

var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
var assert = require('assert')

chai.should()
chai.use(chaiAsPromised)

const osxPath = './build/evolition-darwin-x64/evolition.app/Contents/MacOS/evolition';
describe('application launch', function () {
  this.timeout(10000)

  beforeEach(function () {
    this.app = new Application({
      path: osxPath
    })
    return this.app.start()
  })

  beforeEach(function(){
    chaiAsPromised.transferPromiseness = this.app.transferPromiseness
  })

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('opens a window', function () {
    return this.app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.equal(1)
      .browserWindow.isMinimized().should.eventually.be.false
      .browserWindow.isDevToolsOpened().should.eventually.be.false
      .browserWindow.isVisible().should.eventually.be.true
      .browserWindow.isFocused().should.eventually.be.true
      .browserWindow.getBounds().should.eventually.have.property('width').and.be.above(0)
      .browserWindow.getBounds().should.eventually.have.property('height').and.be.above(0)
  })



  it('should click on the login button and login', function(){
    return this.app.client.waitUntilWindowLoaded()
      .getHTML('#mount', function(err, html){
        ipc('console-log', html);
      })
      .getHTML('#mount', function(err, html){
        ipc('console-log', html);
      })

  })
})
