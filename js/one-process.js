const {app, dialog} = require('electron');

let oneProcess = function (){

	var shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
	  
	  dialog.showErrorBox('', 'Only one process can be executed!')

	  // if (mainWindow) {
	  //   if (mainWindow.isMinimized()) mainWindow.restore();
	  //   mainWindow.focus();
	  // }
	});

	if (shouldQuit) {
	  app.isQuiting = true;
	  app.quit();
	  return;
	}
}

module.exports = oneProcess;