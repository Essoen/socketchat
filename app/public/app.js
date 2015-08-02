/**
 * Created by esso on 01.08.15.
 */
'use strict';
(function(){
    var socket, thisUsername;
    $('#login').click(function(e){
        socket = io();
        socket.connect();
        thisUsername = $('#username').val();
        socket.emit('login', {
            username: thisUsername
        });
        initSocket();
        View.login();
        View.printCtrlMsg({msg: 'You are now logged in.'});
    });

    $('#logout').click(function(e){
        socket.emit('logout', {
           username: thisUsername
        });
        View.printCtrlMsg({msg: 'You are now logged out.'});
        View.logout();
        socket.disconnect();
        socket = null;
    });

    $('#send').click(function(e){
        if(!socket) return;

        View.printMsg('Me', $('#new-message').val());
        socket.emit('msg', {
            user: $('#username').val(),
            msg: $('#new-message').val()
        });
        $('#new-message').val(''); // Clear field
    });

    $('#new-message').keyup(function(e){
        if(event.keyCode == 13){
            $('#send').click();
        }
    });


    var initSocket = function () {
        socket.on('msg', function(msgObj){
            View.printMsg(msgObj.user, msgObj.msg);
        });

        socket.on('ctrl', function(ctrlObj){
            View.printCtrlMsg(ctrlObj);
        });

        socket.on('users', function(usernamesInChat){
            $.each(usernamesInChat, function(index, value){
                if(value === thisUsername){
                    value += ' (you)';
                    usernamesInChat[index] = value;
                }
            });
            $('#users').html(usernamesInChat.join('<br>'));

        });
    };

    var View =  function(){
        var init = function(){
            logout();
        };

        var login = function(){
            $('#login').hide();
            $('#logout').show();
            $('#username').prop('disabled', true);
        };

        var logout = function(){
            $('#login').show();
            $('#logout').hide();
            $('#username').prop('disabled', false);
            $('#users').html('');
        };

        var printCtrlMsg = function(ctrlObj){
            $('#messages').append(ctrlObj.msg + '<br>');
        };

        var printMsg = function(user, msg) {
            $('#messages').append('<bold>' + user + ':</bold> ' + msg + '<br>')
        };

        init();
        return {
            login: login,
            logout: logout,
            printMsg: printMsg,
            printCtrlMsg: printCtrlMsg
        };
    }();


}());

