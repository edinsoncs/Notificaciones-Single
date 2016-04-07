var socket = io.connect('http://localhost:3535');

var user = prompt('Nombre');


socket.on('connect', function(){
	console.log('conectado' + socket.id);
});

if(user == "edinson"){
	socket.emit('edinson',{
		'Nombre': 'edinson',
		'Id': socket.id,
		'Grupo': 'Developer'
	});
	socket.on('mensajeEdinson', function(data){
		alert(data.txt);
	});
}

else if(user == "sergio"){
	socket.emit('sergio',{
		'Nombre': 'sergio',
		'Id': socket.id,
		'Grupo': 'Developer'
	});

	socket.on('mensajeSergio', function(data){
		alert(data.txt);
	});
}

else {
	console.log('ningun usuario');
		socket.on('notificarTodos', function(data){
		alert(data.txt);
	});
}



