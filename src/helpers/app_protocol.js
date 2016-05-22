'use strict';

const path = require('path');
const electron = require('electron');
var protocol = electron.protocol;


protocol.registerFileProtocol('ev',
  (request, callback) => {
  const url = request.url.substr(5);
  callback({
    path: path.normalize(__dirname + '/' + url)
  });
}, (error) => {
    if (error) console.error('Failed to register protocol');
});
