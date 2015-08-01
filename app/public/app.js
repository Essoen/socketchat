/**
 * Created by esso on 01.08.15.
 */
'use strict';
var socket = io();

$('#send').click(function(e){
    printMsg('Me', $('#new-message').val());
    socket.emit('msg', {
        user: $('#username').val(),
        msg: $('#new-message').val()
    });
    $('#new-message').val(''); // Clear field
});

socket.on('msg', function(msgObj){
    printMsg(msgObj.user, msgObj.msg);
});

socket.on('ctrl', function(ctrlObj){
    $('#messages').append(ctrlObj + '<br>')
});

var printMsg = function(user, msg) {
    $('#messages').append('<bold>' + user + ':</bold> ' + msg + '<br>')

};