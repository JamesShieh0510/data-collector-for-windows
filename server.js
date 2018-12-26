

var DesktopUploader = require('desktop-uploader').DesktopUploader;
var request = require('request');
var bodyParser = require('body-parser');
var fs = require('fs');//file system module
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var sensorData =  require('./api/routes/sensor-data');
var data =  require('./api/routes/data-collector');
var predictor =  require('./api/routes/predictor');
var web_home =  require('./api/routes/index');
// ...
//set root path for including css and js files
app.use(express.static(__dirname + '/views/'));

app.set('view engine', 'ejs');
app.use('/predictor', predictor);
app.use('/sensors', sensorData);
app.use('/data', data);
app.use('/', web_home);

// var config = require('./config.json');
// var path=config.uploader_local_path;
// var uploader = new DesktopUploader({
// 	name: 'my-cool-app',
// 	paths: [path],
// 	concurrency: 1,
// 	retries: 1
// });
// uploader.on('upload', function (entry, done) {
//   console.log('Uploading ' + entry.path);
 
//   // Create an HTTP POST request
//   var req = http.request({
//     method: 'POST',
//     hostname: '127.0.0.1:3000',
//     path: '/sensors',
//     headers: {
//       authorization: 'bearer abc123def456'
//     }
//   });
 
//   // Ensure we call `done` in all cases!
//   req.on('error', done);
 
//   req.on('response', function (res) {
//     if (res.statusCode == 200) {
//       done()
//     } else {
//       done(new Error('Bad response!'));
//     }
//   });
 
//   // Pipe the file data into the request
//   entry.stream.pipe(req);
// });
// uploader.throttle = false;


 
console.log('data collector RESTful API server started on: ' + port);
app.listen(port);


