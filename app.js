var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var puerto = require('./puerto');

var path = require('path');

//app.use(express.static(path.join(__dirname, 'frontend')));



app.get('/', function(req, res, next){
	res.status(200);
	res.write('<h1>Hola!!! Edinson</h1>');
	res.end();
});

app.get('/notificar/:usuario/:mensaje', function(req, res, next){
	 var txt = req.params.mensaje;
	 var usuario = req.params.usuario;

	 if(usuario == 'edinson'){
	 	isSocket(txt, usuario);
	 	console.log('Ingrese a notificaciones edinson');
	 }
	 else if(usuario == 'sergio'){
	 	isSocket(txt, usuario);
	 	console.log('Ingrese a notificaciones sergio')
	 }
	 else {
	 	console.log('error');
	 }

	 res.status(200);
	 res.write('<h1>'+txt+'</h1>');
	 res.end();
});

function isSocket(mensaje, user){
	io.on('connection', function(socket){
		console.log('usuario ' + socket.id);

		socket.on('edinson', function(data){
			if(data.Nombre == user){
				socket.emit('mensajeEdinson', {
					txt: mensaje
				});
			}
			else {
				socket.emit('notificarTodos', {
					txt: mensaje
				});
			}
		});

		socket.on('sergio', function(data){
			if(data.Nombre == user){
				socket.emit('mensajeSergio', {
					txt: mensaje
				});
			}
			else {
				socket.emit('notificarTodos', {
					txt: mensaje
				});
			}
		});

		
	});
}


server.listen(puerto.puerto(), function(){
	console.log(puerto.name() + ' en: ' +  puerto.puerto());
});