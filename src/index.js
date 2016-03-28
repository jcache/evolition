'use strict';

const electron = require('electron');
const ipcMain = require('ipc-main');

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
require('crash-reporter').start();
// require('electron').hideInternalModules();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = void 0;
let sheetWindow = void 0;


let createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 440,
    height: 500,
    resizable: false,
    backgroundColor: "#062A4B",
    hasShadow: false,
    frame: false,
  });
  //
  // // Create the browser window.
  // sheetWindow = new BrowserWindow({
  //   width: 800,
  //   height: 850,
  //   resizable: true,
  //   frame: false,
  // });

  mainWindow.setPosition(550, 100);
  // sheetWindow.setPosition(840, 100);

  // and load the index.html of the app.
  mainWindow.loadURL(path.join('file://', __dirname,  '/windows/main_window/index.html'));
  // sheetWindow.loadURL(path.join('file://', __dirname, '/windows/character_sheet/index.html'));

  // // Open the DevTools.
  mainWindow.webContents.openDevTools({detach:false})

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('windows loaded...', mainWindow.webContents.isLoading());
    console.log('windows loaded...', mainWindow.webContents.isLoading());
    mainWindow.show();
    // sheetWindow.show();
  });

  ipcMain.on('app_close', function(event) {
    mainWindow.close();
    app.quit();
  });


  ipcMain.on('app_minimize', function(event) {
    mainWindow.minimize();
  });

  ipcMain.on('resize-to-main', function(e) {
    var options = {
      width: 1070,
      height: 650,
      x: 450,
      y: 100,
    }
    mainWindow.setBounds(options, true);
    console.log(app.getAppPath())
  });

  ipcMain.on('resize-to-login', function(e) {
    var options = {
      width: 440,
      height: 550, 
      x: 550,
      y: 100,
    }

    mainWindow.setBounds(options, true);
    console.log(app.getAppPath())

  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    // sheetWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
