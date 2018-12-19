
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
var path='/Users/jamesshieh/Downloads/DATA';
var uploader = new DesktopUploader({
	name: 'my-cool-app',
	paths: [path],
	concurrency: 1,
	retries: 1
});
uploader.on('upload', function (entry, done) {
  console.log('Uploading ' + entry.path);
 
  // Create an HTTP POST request
  var req = http.request({
    method: 'POST',
    hostname: '127.0.0.1:3000',
    path: '/sensors',
    headers: {
      authorization: 'bearer abc123def456'
    }
  });
 
  // Ensure we call `done` in all cases!
  req.on('error', done);
 
  req.on('response', function (res) {
    if (res.statusCode == 200) {
      done()
    } else {
      done(new Error('Bad response!'));
    }
  });
 
  // Pipe the file data into the request
  entry.stream.pipe(req);
});


 
console.log('data collector RESTful API server started on: ' + port);
app.listen(port);
uploader.throttle = false;


