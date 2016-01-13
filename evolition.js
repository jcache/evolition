var app = require('app');
var menu = require('menu');
var ipcMain = require('ipc-main');
var fs = require('fs');
var fse = require('fs-extra');
var async = require('async');
var path = require('path');
var dir = require('./routes.js');
var main_window = null;
var browser = require('electron').BrowserWindow;
var low = require('lowdb')
var ev_gamesystem = low(dir.data + "game_system.json")
var ev_characters = low(dir.data + "characters.json")
var _ = require('lodash');



require('crash-reporter').start();

ipcMain.on('config-paths', function(e, arg) {
  e.returnValue = dir;
});

app.on('ready', function(e){

  main_window = new browser({
    width: 1070,
    height: 850,
    resizable: false,
    frame: false,
    show: false,
    toolbar: false,
    transparent: false
  });

  // main_window.webContents.openDevTools({detach:false})

  ipcMain.on('close_mainwin', function(event) {
    main_window.close();
    app.quit();
  });

  main_window.webContents.on('did-start-loading', function() {
    main_window.webContents.goToIndex(2);
    console.log("started loading...", main_window.webContents.isLoading());
  });

  main_window.webContents.on('did-stop-loading', function() {
    console.log("stopped loading...", main_window.webContents.isLoading());
  });

  main_window.webContents.on('did-finish-load', function() {
    console.log("windows loaded...", main_window.webContents.isLoading());

    main_window.show();
  });

  main_window.setPosition(10, 100);
  main_window.loadURL('file://' + dir.views + 'main.html');

  main_window.on('closed', function() {
    main_window = null;
  });
});

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
