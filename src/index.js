'use strict';

const electron = require('electron');
const ipcMain = require('electron').ipcMain;
import {ipc} from 'electron';

// Module to control application life.
const app = electron.app;
const Menu = require('menu');

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const fs = require('fs');

require('crash-reporter').start(
  {
    productName: 'evolition',
    companyName: 'evolition.io',
    submitURL: 'http://evolition.io',
    autoSubmit: true,
  }
);

require('electron').hideInternalModules();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow = void 0;
let sheetWindow = void 0;

let createWindow = () => {
  var mainWindowPath = path.resolve(__dirname, '/windows/main_window/', 'index.html');
  var winW = 960;
  var winH = 500;
  var atomScreen = electron.screen;
  var size = atomScreen.getPrimaryDisplay().workAreaSize;
  var vertL = Math.floor(size.width / 2);
  var horzL = Math.floor(size.height / 2);

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: winW,
    height: winH,

    // minWidth: 960,
    // maxWidth: 960,
    // standardWindow: false,
    backgroundColor: '#062A4B',

    // hasShadow: false,
    frame: false,
  });

  mainWindow.webContents.openDevTools({ detach: true });

  var protocol = electron.protocol;

  protocol.registerFileProtocol('ev', (request, callback) => {
    var url = request.url.substr(5);
    callback({ path: path.normalize(__dirname + '/' + url) });
  }, (error) => {
    if (error) console.error('Failed to register protocol');
  });

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
  mainWindow.loadURL('file://' + path.join(__dirname, '/windows/main_window/','index.html'));
  // mainWindow.loadURL(path.normalize('file://' + path.join(__dirname, '/windows/main_window/','index.html')));

  // sheetWindow.loadURL(path.join('file://', __dirname, '/windows/character_sheet/index.html'));
  // // Open the DevTools.

  var size = {}, settingsjson = {};
  try {
    size = JSON.parse(fs.readFileSync(path.join(app.getPath('userData'), 'size')));
  } catch (err) {}

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.setTitle('Evolition');
    // console.log('size', size);
    // console.log('windows loaded...', mainWindow.webContents.isLoading());
    mainWindow.show();
    // sheetWindow.show();
  });

  // mainWindow.webContents.on('will-navigate', function (e, url) {
  //
  //   if (url.indexOf('main_window/index.html#') < 0) {
  //     e.preventDefault();
  //     console.log('doing something');
  //   }
  // });

  ipcMain.on('app_close', (event) => {
    mainWindow.close();
    app.quit();
  });

  ipcMain.on('app_minimize', (event) => {
    mainWindow.minimize();
  });

  ipcMain.on('resize-to-main', (e, arg) => {
    var options = { width: 1140, height: 680 };
    options.x = vertL  - (options.width / 2);
    options.y = horzL - (options.height / 2);
    mainWindow.setBounds(options, true);
  });

  ipcMain.on('resize-to-login', (e, arg) => {
    var options = { width: winW, height: winH };
    options.x = vertL  - (options.width / 2);
    options.y = horzL - (options.height / 2);
    mainWindow.setBounds(options, true);
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
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
          click: () => {
            app.quit();
          },
        },
        {
          label: 'Hide ElectronReact',
          accelerator: 'Command+H',
          selector: 'hide:',
        },
      ],
    }, {
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
    }, {
      label: 'Developer',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: function() { BrowserWindow.getFocusedWindow().reloadIgnoringCache(); }
        },{
          label: 'Toggle DevTools',
          accelerator: 'Alt+Command+I',
          click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); }
        },
      ],
    }
  ];

  Menu.setApplicationMenu(
    Menu.buildFromTemplate(template)
  );
};

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
