/**
 * Created by esso on 01.08.15.
 */
'use strict';
var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('app/public')); // Serve webapp

var usernames = [];
io.on('connection', function(socket){
    socket.on('login', function(userObj){
        socket.broadcast.emit('ctrl', {
            msg: userObj.username + ' logged in'
        });
        usernames.push(userObj.username);
        io.emit('users', usernames);
    });

    socket.on('msg', function(msgObj){
        socket.broadcast.emit('msg', msgObj);
    });

    socket.on('logout', function(userObj){
        socket.broadcast.emit('ctrl', {msg: userObj.username + ' logged out.'});
        removeUsername(userObj.username);
        io.emit('users', usernames);
    });

    socket.on('disconnect', function(){
        // Broadcast usernames again, the case the user did not log out
        socket.broadcast.emit('users', usernames);
        // @TODO broadcast message about user leaving in the case he did not log out first
    });
});


http.listen(3000, function(){
    console.log('listening on port 3000');
});

var removeUsername = function(name){
    var i = usernames.indexOf(name);
    if(i !== -1){
        usernames.splice(i, 1);
    }
};
