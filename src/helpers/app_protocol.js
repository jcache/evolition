'use strict';

const path = require('path');
const electron = require('electron');
const protocol = electron.protocol;
const app_path = path.join(__dirname, '../');

protocol.registerFileProtocol('ev',
  (request, callback) => {
  const url = request.url.substr(5);
  callback({path: path.normalize(app_path + url)});
}, (error) => {
    if (error) console.error('Failed to register protocol');
});
