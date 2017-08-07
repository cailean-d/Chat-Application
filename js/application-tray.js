const {app, Tray, dialog, Menu} = require('electron');
const jsonfile = require('jsonfile');
const SETTINGS = jsonfile.readFileSync('./config.json');

app.showExitPrompt = SETTINGS.confirmExit

let appTray
let trayIsCreated = false

var tray = {
  show : function(win){
     appTray = new Tray(__dirname + '/../img/chat.ico');
     trayIsCreated = true
      let contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App', click: function () {
                win.show();
            }
        },
        {
            label: 'Quit', click: function () {
                if (app.showExitPrompt == 'true') {
                  dialog.showMessageBox({
                          type: 'question',
                          buttons: ['Yes', 'No'],
                          title: 'Confirm',
                          message: 'Unsaved data will be lost. Are you sure you want to quit?'
                      }, function (response) {
                          if (response === 0) { 
                               app.showExitPrompt = false
                               app.isQuiting = true;
                               app.quit();  
                          }
                  })
                } else{
                      app.isQuiting = true;
                      app.quit();
                }
            }
        }
    ])

      // appTray.displayBalloon({
      //  title: 'msg',
      //  content: 'new message'
      // });

    appTray.setToolTip('NodeJS Chat');
    appTray.setContextMenu(contextMenu);
    appTray.on('double-click', function(){
      win.show();
    })

    return appTray;
  },
  hide: function(){
    if(trayIsCreated) {
      appTray.destroy()
      trayIsCreated = false
    }
  },
  displayBalloon: function (obj){
    appTray.displayBalloon(obj)
  }
}

module.exports = tray;