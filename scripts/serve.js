'use strict';

import { spawn } from 'child_process';
import electron from 'electron-prebuilt';
import browserSync from 'browser-sync';

// BrowserSync
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
  const main = require('fs').readFileSync('src/main' + src).toString();
  const sheet = require('fs').readFileSync('src/sheet' + src).toString();
  return require('less').render([main, sheet]);
};

const BrowserSyncOPTS = {
  ui: false,
  ghostMode: false,
  injectFileTypes: ['less'],
  open: false, // false
  // server: [
  //   'src/main',
  //   'src/sheet',
  // ],
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
      },
      ...process.env,
    },
  });

  // WATCH
  Bsync.watch('src/main/**/*').on('change', Bsync.reload);
  Bsync.watch('src/sheet/**/*').on('change', Bsync.reload);
});
