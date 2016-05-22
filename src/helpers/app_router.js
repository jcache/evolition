'use strict';
const path = require('path');
const electron = require('electron');
const fs = require('fs-extra');
const character_data = require('../seed/characters');

class Route {

  constructor() {
    this.app_data_pathb = electron.app.getPath('appData') + '/evolition/data/';
    this.app_plugin_path = electron.app.getPath('appData') + '/evolition/plugins/';
  }

  getAppDataPath() {
    return this.app_data_path;
  }

  loadCharacterDB() {

    // console.log('seed data: ' , character_data.characters);
    const srcpath = this.app_data_path;
    const file = srcpath + 'characters.json';

    // IF THE character.json FILE WAS NEVER CREATED, CREATE IT
    fs.exists(file, (exists) => {
      if (exists !== true) {
        // MAKES DATA DIRECTORY
        fs.mkdirs(srcpath, (err) => {
          if (err) return console.error(err);
          // console.log('[JOB] -> DATABASE DIRECTORY CREATED');
          // CREATES DATABASE IF IT DOESN'T EXIST
          fs.ensureFileSync(file);
          // console.log('[JOB] -> CHARACTER DATABASE CREATED');
          // POPULATE FROM SEED FILE
          fs.outputJson(file, character_data);
          // console.log('[JOB] -> CHARACTER DATA POPULATED');
        });
      }
    });
  }
}

const AppRouter = new Route();

module.exports = AppRouter;
