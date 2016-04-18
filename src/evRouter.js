const epath   = __dirname;
var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
import {app} from 'electron';
const seed = require('./seed');
class Route {
  constructor() {
    this.app_data_path    = app.getPath('appData') + '/evolition/data/';
    this.app_plugin_path  = app.getPath('appData') + '/evolition/plugins/';
  }

  getAppDataPath() {
    return this.app_data_path;
  }

  loadCharacterDB() {
    // console.log("seed data: ", seed.characters);
    const srcpath = this.app_data_path;
    var file = srcpath + 'characters.json';

    // IF THE character.json FILE WAS NEVER CREATED, CREATE IT
    fs.exists(file, (exists) => {
      if (exists !== true) {
        // MAKES DATA DIRECTORY
        fse.mkdirs(srcpath, (err) => {
          if (err) return console.error(err);
          console.log('[JOB] -> DATABASE DIRECTORY CREATED');
          // CREATES DATABASE IF IT DOESN'T EXIST
          fse.ensureFileSync(file);
          console.log('[JOB] -> CHARACTER DATABASE CREATED');
          // POPULATE FROM SEED FILE
          fse.outputJson(file, seed);
          console.log('[JOB] -> CHARACTER DATA POPULATED');
        });
      }
    });
  }
}

const evRouter = new Route();

module.exports = evRouter;
