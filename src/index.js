'use strict';

const electron = require('electron');
const ipcMain = require('ipc-main');

// Module to control application life.
const app = electron.app;
const Menu = require('menu');

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const path = require('path');

require('crash-reporter').start(
  {
    productName: 'evolition',
    companyName: 'evolition.io',
    submitURL: 'http://evolition.io',
    autoSubmit: true,
  }
);

// require('electron').hideInternalModules();
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow = void 0;

let sheetWindow = void 0;

let createWindow = () => {
  var winW = 440;
  var winH = 500;
  var atomScreen = require('screen');
  var size = atomScreen.getPrimaryDisplay().workAreaSize;
  var vertL = Math.floor(size.width / 2);
  var horzL = Math.floor(size.height / 2);

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: winW,
    height: winH,

    // resizable: false,
    backgroundColor: '#062A4B',
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

  mainWindow.setPosition(
    vertL - (winW / 2),
    horzL - (winH / 2)
  );

  // sheetWindow.setPosition(840, 100);
  // and load the index.html of the app.
  mainWindow.loadURL(path.join('file://', __dirname,  '/windows/main_window/index.html'));

  // sheetWindow.loadURL(path.join('file://', __dirname, '/windows/character_sheet/index.html'));
  // // Open the DevTools.

  mainWindow.webContents.openDevTools({ detach:false });

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('windows loaded...', mainWindow.webContents.isLoading());
    mainWindow.show();

    // sheetWindow.show();
  });

  ipcMain.on('app_close', function (event) {
    mainWindow.close();
    app.quit();
  });

  ipcMain.on('app_minimize', function (event) {
    mainWindow.minimize();
  });

  ipcMain.on('resize-to-main', function (e) {
    var options = { width: 1070, height: 620 };
    options.x = vertL  - (options.width / 2);
    options.y = horzL - (options.height / 2);
    mainWindow.setBounds(options, true);
  });

  ipcMain.on('resize-to-login', function (e) {
    var options = { width: winW, height: winH };
    options.x = vertL  - (options.width / 2);
    options.y = horzL - (options.height / 2);
    mainWindow.setBounds(options, true);
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {

    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.

    mainWindow = null;

    sheetWindow = null;
  });
  var template = [
    {
      label: 'Application',
      submenu: [
        { label: 'About Application', selector: 'orderFrontStandardAboutPanel:' },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'Command+Q',
          click: function () {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
      ],
    },
  ];

  Menu.setApplicationMenu(
    Menu.buildFromTemplate(template)
  );
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
