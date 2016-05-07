'use strict';

import { spawn } from 'child_process';
import electron from 'electron-prebuilt';
import browserSync from 'browser-sync';

import browserSyncConnectUtils from 'browser-sync/lib/connect-utils';
const Bsync = browserSync.create();
var historyApiFallback = require('connect-history-api-fallback');

const getRootUrl = (options) => {
  const port = options.get('port');
  return `http://localhost:${port}`;
};

const getSheetUrl = (options) => {
  const pathname = browserSyncConnectUtils.clientScript(options);
  return getRootUrl(options) + pathname;
};

const getMainUrl = (options) => {
  const pathname = browserSyncConnectUtils.clientScript(options);
  return getRootUrl(options) + pathname;
};

const lessMiddleware = (req, res, next) => {
  const parsed = require('url').parse(req.url);
  if (parsed.pathname.match(/\.less$/)) {
    return less(parsed.pathname).then((output) => {
      res.setHeader('Content-Type', 'text/css');
      res.end(output.css);
    });
  }

  next();
};

const less = (src) => {
  const main = require('fs').readFileSync('app/main' + src).toString();
  const sheet = require('fs').readFileSync('app/sheet' + src).toString();
  return require('less').render([main, sheet]);
};

const BrowserSyncOPTS = {
  ui: false,
  ghostMode: false,
  injectFileTypes: ['less'],
  open: false, // false
  server: [
    'app/main',
    'app/sheet',
  ],
  notify: false,
  logPrefix: 'EVOLITION.IO',
  logSnippet: false,
  logLevel: 'info',
  middleware: [
    lessMiddleware,
    require('connect-logger')(),
    historyApiFallback(),
  ],
  port: 35829,
  socket: {
    domain: getRootUrl,
  },
};

Bsync.init(BrowserSyncOPTS, (err, bs) => {

  // ERRORS
  if (err) return console.error(err);

  // SPAWN
  spawn(electron, ['.'], {
    stdio: 'inherit',
    env: {
      ...{
        NODE_ENV: 'development',
        BROWSER_SYNC_MAIN_URL: getMainUrl(bs.options),
        BROWSER_SYNC_SHEET_URL: getSheetUrl(bs.options),
      },
      ...process.env,
    },
  });

  // WATCH
  Bsync.watch('app/main/**/*').on('change', Bsync.reload);
  Bsync.watch('app/sheet/**/*').on('change', Bsync.reload);
});
