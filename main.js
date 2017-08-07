const {app, BrowserWindow, Tray, Menu, dialog, ipcMain, nativeImage } = require('electron');
// const menu = require('./js/main-menu');
const oneProcess = require('./js/one-process');
const tray = require('./js/application-tray');
const jsonfile = require('jsonfile');
const SETTINGS = jsonfile.readFileSync('./config.json');

if (SETTINGS.oneProcess == 'true'){oneProcess()}
// if (SETTINGS.showMenu == 'true'){menu()}

app.showExitPrompt = SETTINGS.confirmExit

const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 900, 
    height: 565, 
    resizable: false, 
    minWidth: 900, 
    minHeight: 565,
    maxWidth: 900,
    maxHeight: 565,
    fullscreen: false, 
    show: false
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  
  mainWindow.once('ready-to-show', () => {
  mainWindow.show()
  });

  // let tray = showTray();

  mainWindow.on('close', (e) => {
    if (app.showExitPrompt == 'true') {
        e.preventDefault() 
        dialog.showMessageBox({
            type: 'question',
            buttons: ['Yes', 'No'],
            title: 'Confirm',
            message: 'Unsaved data will be lost. Are you sure you want to quit?'
        }, function (response) {
            if (response === 0) { 
                app.showExitPrompt = false
                mainWindow.close()
            }
        })
    }
})

  mainWindow.on('closed', function () {
    mainWindow = null
  })
  if(SETTINGS.trayOnMinimize == 'true'){
      mainWindow.on('minimize', function (event) {
      event.preventDefault()
      mainWindow.hide();
      })

      mainWindow.on('hide', function(){
         tray.show(mainWindow);
      }) 
      mainWindow.on('show', function(){
         tray.hide();
      })
  }


    // mainWindow.flashFrame(true)

    ipcMain.on('update-badge', (event, data) => {
    let img = nativeImage.createFromDataURL('./img/chat.ico')
    mainWindow.setOverlayIcon(img, 'description')
    })

    ipcMain.on('tray-message', (event, data) => {
        tray.displayBalloon({
       title: data.title,
       content: data.content
      });
    })


    // ipcMain.on('show-settings', (event, data) => {
    //   let settingsWin = new BrowserWindow({ 
    //       width: 600, 
    //       height: 400, 
    //       resizable: false, 
    //       show: false,
    //       parent: maintWindow 
    //     });
    //     settingsWin.loadURL(url.format({
    //     pathname: path.join(__dirname, './settings.html'),
    //     protocol: 'file:',
    //     slashes: true
    //   }));


    //   settingsWin.once('ready-to-show', () => {
    //      win.show()
    //   });
        
    //   settingsWin.on('closed', function () { win = null });
    // })


    if (SETTINGS.showMenu == 'true'){
      const template = 
      [
        // {
        //   label: 'Edit',
        //   submenu: [
        //     {role: 'undo'},
        //     {role: 'redo'},
        //     {type: 'separator'},
        //     {role: 'cut'},
        //     {role: 'copy'},
        //     {role: 'paste'},
        //     {role: 'pasteandmatchstyle'},
        //     {role: 'delete'},
        //     {role: 'selectall'}
        //   ]
        // },
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
              label : 'Minimize to tray',
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
                      let settingsWin = new BrowserWindow({ 
                          width: 600, 
                          height: 400, 
                          resizable: true, 
                          show: false,
                          parent: mainWindow 
                      });
                      // settingsWin.setMenu(null)
                      settingsWin.loadURL(url.format({
                        pathname: path.join(__dirname, './settings.html'),
                        protocol: 'file:',
                        slashes: true
                      }));


                      settingsWin.once('ready-to-show', () => {
                         settingsWin.show()
                      });
                    
                      settingsWin.on('closed', function () { win = null });
               }
            }
          ]
        }
      ]

      const menu = Menu.buildFromTemplate(template)
      // Menu.setApplicationMenu(menu)
      mainWindow.setMenu(menu)
    }

}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})


