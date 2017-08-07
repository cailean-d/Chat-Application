const jsonfile = require('jsonfile');
const SETTINGS = jsonfile.readFileSync('./config.json');
const remote1 = require('electron').remote;
const ipcRenderer = require('electron').ipcRenderer;
const currentWindow1 = remote1.getCurrentWindow();  

var myName = '';
var isTyping = false;
var type;
var serverIP = SETTINGS.server.ip;
var isConnected = false;

$(function () {

    //connect
var socket = io(`http://${serverIP}:3000`);

// ----------------------------------------
//     SEND MESSAGE
// ----------------------------------------
    $('form').submit(function(){

      if ($('#m').val() != ''){  
        //format date
           date = new Date();
           formatter = new Intl.DateTimeFormat('ru',{ 
            month: "long", 
            day: "numeric", 
            hour: "numeric", 
            minute: "numeric" 
            });
        var time =  formatter.format(date);
        //-------------------------
      socket.emit('chat message', {
        message : $('#m').val(),
        sender: myName,
        time : time
      });

      //append my message to chat
      $('#messages').append(`<div class='myMessage'><div  class='msg'><span class='s'>Me:</span> ${$('#m').val()}</div><div class='time'>[${time}]</div></div>`);
      $('#messages').scrollTop(9999999);

      $('#m').val('');   // clear input
      } 
      return false;
    });

// ----------------------------------------
//     GET MESSAGES
// ----------------------------------------

    socket.on('chat message', function(msg){
        $('#messages').append(`<div class='message'><div  class='msg'><span class='s'>${msg.sender}:</span> ${msg.message}</div><div class='time'>[${msg.time}]</div></div>`);
        $('#messages').scrollTop(9999999);
        
         if(SETTINGS.trayMessage == 'true'){
            if (!currentWindow1.isVisible()) {
               ipcRenderer.send('tray-message', {
                  title: `${msg.sender}`,
                  content: `${msg.message}`
               });
             }
         }
         if(SETTINGS.flashFrameOnMessage == 'true'){
             if(currentWindow1.isVisible()) {
              currentWindow1.flashFrame(true);
              ipcRenderer.send('update-badge', 'boo')
             }
         }
    });

// ----------------------------------------
//     GET NAME 
// ----------------------------------------

    socket.on('name', function(name){
         myName = name;
         $('.name span').text(name);
    });

// ----------------------------------------
//     GET ONLINE
// ----------------------------------------

    socket.on('online', function(data){
      var html = '';
      for(var i = 0; i < data.length; i++){
        html += `<li class='${data[i]} list-group-item'>${i+1}. ${data[i]}</li>`
      }
      $('.online ul').html(html);
    });

// ----------------------------------------
//     TYPING
// ----------------------------------------
  
    $('#m').on('keyup', function(){
        clearTimeout(type);
        type = setTimeout(function(){
        isTyping = false;
        socket.emit('typingEnd', myName);
      }, 1000);
    });

    $('#m').on('keydown', function(){
        if(!isTyping) {
           socket.emit('typing', myName);
        }
        isTyping = true;
    });

    socket.on('typing', function(client){
        $('.type ul').append($(`<li class='${client}'>${client} is typing...</li>`));
    });   
    
    socket.on('typingEnd', function(client){
         $('.type ul .' + client).remove();
    });

// ----------------------------------------
//      CONNECTED / DISCONNECTED USER
// ----------------------------------------
  
  socket.on('connectedUser', function(user){
    $('#messages').append(`<div class='connectedUser'><div>${user} connected.</div>`);
    $('#messages').scrollTop(9999);
  });

  socket.on('disconnectedUser', function(user){
    $('#messages').append(`<div class='disconnectedUser'><div>${user} disconnected.</div>`);
    $('#messages').scrollTop(9999999);
  });

// ----------------------------------------
//      CONNECTED / DISCONNECTED SERVER
// ----------------------------------------

  socket.on('disconnect', function(){
    $('#messages').append(`<div class='disconnectedUser'><div>Server is offline.</div>`);
    $('#messages').scrollTop(9999999);
    $('.overlay').show();
    $('.offline').show();
  });

  socket.on('connect', function(){
      isConnected = true;
      $('.overlay').hide();
      $('.offline').hide();
  });

  setTimeout(function(){
    if(isConnected == false){
      $('.offline').text('CONNECTION PROBLEM!');
      $('.offline').show();
    }
  }, 5000);


});