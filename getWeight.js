const SerialPort = require('serialport')

const port = new SerialPort('/dev/ttyUSB0',{ baudRate:9600 })

var weightValue = 0;

var app = require('express')();
var http = require('http').createServer(app);
var io = require("socket.io")(http);
const Readline = SerialPort.parsers.Readline;



io.on('connection', (socket)=>{
          socket.on("get weight", function(){ 
		  
		console.log(weightValue);
		socket.emit("weight", weightValue);
	 		 
	  
	  });
	  
          //socket.broadcast.emit("hello there!");

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});



port.on('data', function (data) {

  data = Buffer.from(data);
  data = data.toString();
  //data = data.slice(0,6);
    
  weightValue = data;

});

/*port.close(function(err){
  console.log('port closed', err);

});*/

port.on('error', function (err){
	console.log('error!');
	console.log(err);
	process.exit(1);
});
