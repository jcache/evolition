'use strict';
const path = require('path');
const electron = require('electron');

const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  shell,
  Menu
} = electron;

import { AppMenu } from './helpers/app_menu';
import { DevMenu } from './helpers/dev_menu';
import { EditMenu } from './helpers/edit_menu';
import AppRouter from './helpers/app_router';

const setApplicationMenu = function () {
  const menus = [
    AppMenu,
    EditMenu
  ];

  if (process.env.NODE_ENV === 'development') {
    menus.push(DevMenu);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};


let mainWindow = void 0;
let sheetWindow = void 0;

let createWindow = () => {

  // SETS APPLICATION MENU
  setApplicationMenu();

  // PROTOCOL MODULE
  require('./helpers/app_protocol');

  // CRASH REPORTER
  require('./helpers/app_reporter');

  // APP ROUTER
  console.log(AppRouter.getAppDataPath());

  //
  AppRouter.loadCharacterDB();
  var winW = 960;
  var winH = 500;
  var atomScreen = electron.screen;
  var size = atomScreen.getPrimaryDisplay().workAreaSize;
  var vertL = Math.floor(size.width / 2);
  var horzL = Math.floor(size.height / 2);

  mainWindow = new BrowserWindow({
    width: winW,
    height: winH,
    minWidth: 960,
    maxWidth: 1200,
    // standardWindow: false,
    backgroundColor: '#282c3a',
    // hasShadow: false,
    frame: false,
  });



  sheetWindow = new BrowserWindow({
    width: winW,
    height: winH,
    minWidth: 960,
    maxWidth: 1200,
    show: false,
    // standardWindow: false,
    backgroundColor: '#282c3a',
    // hasShadow: false,
    frame: false,
  });

  mainWindow.setPosition(
    vertL - (winW / 2),
    horzL - (winH / 2)
  );

  mainWindow.on('closed', () => {
    mainWindow  = null;
    sheetWindow  = null;
  });

  if (process.env.NODE_ENV === 'development') {
    // mainWindow.webContents.openDevTools({ detach: true });
  }

  mainWindow.loadURL(`file://${__dirname}/main/index.html`);
  // sheetWindow.loadURL(`file://${__dirname}/sheet/index.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.setTitle('EVOLITION');
    mainWindow.show();
  });

  ipcMain.on('config-paths', (e, arg) => {
    const routePaths = evRouter || [];
    e.returnValue = routePaths;
  });

  ipcMain.on('app_close', (event) => {
    mainWindow.close();
    sheetWindow.close();
    app.quit();
  });

  ipcMain.on('open_character_sheet', (event) => {
    sheetWindow.show();
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

};

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
    app.quit();
  // }
});

app.on('ready', createWindow);

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
