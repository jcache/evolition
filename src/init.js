const path = require('path');

// FOR HOT RELOADING IN DEV MODE
if ( process.env.NODE_ENV === 'development' ) {
  const resolvePath = require('resolve-path');
  const appRoot = path.join(__dirname, '..');
  const appDir = path.join(__dirname, '../src');
  require('electron-compile').init(appRoot, resolvePath(appDir, 'main.js'), false);
}

// CALLS ELECTRON
require('./main');
