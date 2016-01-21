var app = require('app');
var menu = require('menu');
var ipcMain = require('ipc-main');
var async = require('async');
var fse = require('fs-extra');
var path = require('path');
var dir = require('./routes.js');
var main_window = null;
var electron = require('electron');
var electronConnect = require('electron-connect');
var browser = require('electron').BrowserWindow;
var _ = require('lodash');


// Verify app Data Directory
dir.verifyData();
var low = require('lowdb');
var ev_characters = low(path.join(dir.data, "characters.json"));
var ev_gamesystem = low(path.join(dir.data, "game_system.json"));


require('crash-reporter').start();

ipcMain.on('config-paths', function(e, arg) {
  e.returnValue = dir;
});

app.on('ready', function(e){
  var protocol = electron.protocol;

  protocol.registerFileProtocol('ev', function(request, callback) {
    var url = request.url.substr(5);
    callback({path: path.normalize(__dirname + '/' + url)});
}, function(error) {
    if (error) console.error('Failed to register protocol');
  });

  main_window = new browser({
    width: 1070,
    height: 850,
    resizable: true, // TODO To allow viewing of devtools
    frame: false,
    show: false,
    toolbar: false,
    transparent: false
  });

  client = electronConnect.client.create(main_window,{"sendBounds": false});

  main_window.webContents.openDevTools({detach:false})

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
  main_window.loadURL('file://' + dir.views + 'main_window/window.html');

  main_window.on('closed', function() {
    main_window = null;
    client.sendMessage('closed');
  });
});

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
