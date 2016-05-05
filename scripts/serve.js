import { spawn } from 'child_process';
import electron from 'electron-prebuilt';
import browserSync from 'browser-sync';
import browserSyncConnectUtils from 'browser-sync/lib/connect-utils';
const Bsync = browserSync.create();

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

function lessMiddleware (req, res, next) {
    var parsed = require("url").parse(req.url);
    if (parsed.pathname.match(/\.less$/)) {
        return less(parsed.pathname).then(function (o) {
            res.setHeader('Content-Type', 'text/css');
            res.end(o.css);
        });
    }
    next();
}

/**
 * Compile less
 */
function less(src) {
    var f = require('fs').readFileSync('app' + src).toString();
    return require('less').render(f);
}

const BrowserSyncOPTS = {
  ui: false,
  ghostMode: false,
  injectFileTypes: ["less"],
  // // ** //
  open: false, // false
  // server: [
  //   'app/main',
  //   'app/sheet'
  // ],
  // // ** //
  notify: false,
  logPrefix: "EVOLITION.IO",
  logSnippet: false,
  logLevel: "info",
  middleware: lessMiddleware,
  port: 35829,
  socket: {
    domain: getRootUrl
  }
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
        BROWSER_SYNC_SHEET_URL: getSheetUrl(bs.options)
      },
      ...process.env,
    },
  });

  // WATCH
  Bsync.watch('app/main/**/*').on('change', Bsync.reload);
  Bsync.watch('app/sheet/**/*').on('change', Bsync.reload);
});
