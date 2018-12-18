
var DesktopUploader = require('desktop-uploader').DesktopUploader;
var request = require('request');
var bodyParser = require('body-parser');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/sensor-data'); //importing route
routes(app); //register the route


 var uploader = new DesktopUploader({
	name: 'my-cool-app',
	paths: ['/Users/jamesshieh/Downloads/DATA'],
	concurrency: 5,
	retries: 2
});

console.log('data collector RESTful API server started on: ' + port);
app.listen(port);


setTimeout(synchronization, 2000);
function synchronization(){
	var url = 'http://127.0.0.1:3000/sensors';
	// var headers = {
	// 	authorization: 'bearer abc123'
	// };
	 
	console.log('uploading...'); 
	uploader.watch('/Users/jamesshieh/Downloads/DATA', {owner: 'James'});
	uploader.resume();

}

