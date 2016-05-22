import { app, BrowserWindow } from 'electron';

export var AppMenu =
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
}
