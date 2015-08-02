/**
 * Created by esso on 01.08.15.
 */
'use strict';
var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public')); // Serve webapp
var usernames = [];
io.on('connection', function(socket){
    socket.on('login', function(userObj){
        socket.broadcast.emit('ctrl', {
            msg: userObj.username + ' connected'
        });
        usernames.push(userObj.username);
        io.emit('users', usernames);
    });

    socket.on('msg', function(msgObj){
        socket.broadcast.emit('msg', msgObj);
    });

    socket.on('disconnect', function(){
        //@todo find name of user leaving and send with ctrl
        socket.broadcast.emit('ctrl', {
            msg: 'A user disconnected'
        });
    });
});

http.listen(3000, function(){
    console.log('listening on port 3000');
});

