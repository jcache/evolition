const epath   = __dirname;
import {path} from 'path';
import {fs} from 'fs';
// import {fse} from 'fse';
import {app} from 'electron';

class Route {
  constructor() {
    this.application_path = app.getPath('appData') + '/evolition/';
  }

  getAppPath() {
    return this.application_path;
  }

  getStoragePath() {
    return this.application_path + 'storage/';
  }
}

const evRouter = new Route();

module.exports = evRouter;
