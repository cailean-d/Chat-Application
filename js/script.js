var btn = document.querySelector('.link');
var btn2 = document.querySelector('.google');
var btn3 = document.querySelector('.google_here');
var loadingOverlay = document.querySelector('.dots');

      btn2.onclick = function(){
         var shell = require('electron').shell;
         event.preventDefault();
         shell.openExternal('https://google.ru');
      }
 const remote = require('electron').remote;
var currentWindow = remote.getCurrentWindow();

btn3.onclick = function(){
currentWindow.loadURL('https://www.google.ru/');
}

var line = "...",
    speed = 500, i = 0;

function m_line() {
    if ( i++ < line.length ) {
        loadingOverlay.innerHTML = line.substring( 0, i );
    } else{
        loadingOverlay.innerHTML = "";
        i = 0;
    }
    setTimeout( m_line, speed );
}

m_line();
