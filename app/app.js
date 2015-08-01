/**
 * Created by esso on 01.08.15.
 */
'use strict';
var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public')); // Serve webapp

io.on('connection', function(socket){
    socket.broadcast.emit('ctrl', 'A user connected');
    socket.on('disconnect', function(){
        socket.broadcast.emit('ctrl', 'A user disconnected');
    });

    socket.on('msg', function(msgObj){
        socket.broadcast.emit('msg', msgObj);
    });
});

http.listen(3000, function(){
    console.log('listening on port 3000');
});

