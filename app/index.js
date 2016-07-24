/**
 * Created by esso on 01.08.15.
 */
'use strict';
var _ = require('lodash');

var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('app/public')); // Serve webapp

var usernames = [];
var clients = [];
io.on('connection', function(socket){
    socket.on('login', function(userObj){
        socket.broadcast.emit('ctrl', {
            msg: userObj.username + ' logged in'
        });
        usernames.push(userObj.username);
        clients.push({socket: socket, username: userObj.username});
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
        var client = findClient(socket);
        socket.broadcast.emit('ctrl', {msg: client.username + ' disconnected.'});
        socketDisconnected(socket);
        socket.broadcast.emit('users', usernames);
    });
});


http.listen(3000, function(){
    console.log('listening on port 3000');
});

var findClient = function(socket){
    for (var i = 0; i < clients.length; i++){
        if (socket === clients[i].socket) return clients[i];
    }
    return false;
}

var socketDisconnected = function(socket){
    var client = findClient(socket);
    if(client){
        removeUsername(client.username)
        _.remove(clients, function(e) {
            return e.socket === socket;
        });
    }
}

var removeUsername = function(name){
    var i = usernames.indexOf(name);
    if(i !== -1){
        usernames.splice(i, 1);
    }
};
