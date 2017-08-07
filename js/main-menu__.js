const {ipcRenderer, BrowserWindow, app, Menu, remote} = require('electron')
// var main = remote.require("./main.js");

var createMenu = function(){

const template = [
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'},
      {
        label : 'tray',
        click () { 
          mainWindow.hide();
        }
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://electron.atom.io') }
      },
      {
        label: 'About author',
        click () { require('electron').shell.openExternal('https://github.com/cailean-d') }
      },
      {
        label: 'Settings',
        click () {
       		require('electron').BrowserWindow('show-settings', 'true')
         }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

}

module.exports = createMenu;