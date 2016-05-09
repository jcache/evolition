import app from 'app';
const electron = require('electron');
const ipcMain = require('electron').ipcMain;
const Menu = require('menu');
const path = require('path');
import BrowserWindow from 'browser-window';
import crashReporter from 'crash-reporter';

crashReporter.start(
  {
    productName: 'evolition',
    companyName: 'evolition.io',
    submitURL: 'http://evolition.io',
    autoSubmit: true,
  }
);

let mainWindow = void 0;
let sheetWindow = void 0;

let createWindow = () => {
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

  var protocol = electron.protocol;

  protocol.registerFileProtocol('ev', (request, callback) => {
    var url = request.url.substr(5);
    callback({ path: path.normalize(__dirname + '/' + url) });
  }, (error) => {
    if (error) console.error('Failed to register protocol');
  });


  sheetWindow = new BrowserWindow({
    width: winW,
    height: winH,
    minWidth: 960,
    maxWidth: 1200,
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
    // ( OPTIONAL )
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
          label: 'Reload Main',
          accelerator: 'Command+R',
          click: () => mainWindow.webContents.reloadIgnoringCache(),
        },
        {
          label: 'Reload Sheet',
          accelerator: 'Command+Shift+R',
          click: () => sheetWindow.webContents.reloadIgnoringCache(),
        },
        {
          label: 'Toggle DevTools',
          accelerator: 'Alt+Command+I',
          click: () => BrowserWindow.getFocusedWindow().toggleDevTools(),
        },
      ],
    },
  ];

  Menu.setApplicationMenu(
    Menu.buildFromTemplate(template)
  );

};

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', createWindow);

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
