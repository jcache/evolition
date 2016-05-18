const path = require('path');

const resolvePath = require('resolve-path');

const appRoot = path.join(__dirname, '..');

const appDir = path.join(__dirname, '../src');

require('electron-compile').init(appRoot, resolvePath(appDir, 'main.js'), false);
