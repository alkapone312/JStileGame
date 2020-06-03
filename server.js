console.log('Server is running...');

const express = require("express");

var app = express();
var server = app.listen(80);

app.use(express.static('public'));


var socket = require('socket.io')

var io = socket(server);

io.sockets.on('connection', function(socket){

	console.log('new connection:' + socket.id);

	socket.on('ppos', function(data){
		socket.broadcast.emit('ppos', data);
	})

	socket.on('disconnect', function(){
		console.log("Player disconnected:" + socket.id);
		socket.broadcast.emit('disc', socket.id);
	})

});


