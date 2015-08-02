/**
 * Created by esso on 01.08.15.
 */
'use strict';
(function(){
    var socket, thisUsername;
    $('#login').click(function(e){
        socket = io();
        thisUsername = $('#username').val();
        socket.emit('login', {
            username: thisUsername
        });
        printCtrl({msg: 'You are now logged in.'});
        initSocket();
    });

    $('#send').click(function(e){
        if(!socket) return;

        printMsg('Me', $('#new-message').val());
        socket.emit('msg', {
            user: $('#username').val(),
            msg: $('#new-message').val()
        });
        $('#new-message').val(''); // Clear field
    });

    var printCtrl = function(ctrlObj){
      $('#messages').append(ctrlObj.msg + '<br>');
    };

    var printMsg = function(user, msg) {
        $('#messages').append('<bold>' + user + ':</bold> ' + msg + '<br>')
    };

    var initSocket = function () {
        socket.on('msg', function(msgObj){
            printMsg(msgObj.user, msgObj.msg);
        });

        socket.on('ctrl', function(ctrlObj){
            printCtrl(ctrlObj);
        });

        socket.on('users', function(usernamesInChat){
            $.each(usernamesInChat, function(index, value){
                if(value === thisUsername){
                    value += ' (you)'
                    usernamesInChat[index] = value;
                }
            });
            $('#users').html(usernamesInChat.join('<br>'));

        });
    };
}());

