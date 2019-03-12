'use strict';

const child_process = require('child_process');
var config = require('../../config.json');
function getClientIp(req) {
var ip = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress
  return ip;
};
exports.predict_result= function(req, res, callback) {
	var predictItemId='';
	if ( typeof req.params.predictItemId !== 'undefined' && req.params.predictItemId )
		predictItemId=req.params.predictItemId;

	try {

		var exe_path = config.algorithm_path;
		var raw_data_path = config.raw_data_path;
		var algorithm_cmd = config.algorithm_cmd;
		var model_path = config.model_path;

		var workerProcess = child_process.exec(algorithm_cmd+' '+raw_data_path+' '+model_path+' '+predictItemId, {cwd: exe_path},
			function (error, stdout, stderr) {
				if (error) {
					console.log(error.stack);
					console.log('Error code: '+error.code);
					console.log('Signal received: '+error.signal);
				}
				console.log(`stdout: ${stdout}`);
				//return "{"+stdout+",result:success}";
				var split_char="&";
				var result = stdout.split(split_char);
				callback({'target':result[1],'predicted_result':result[2]});
				

			}
		);
		workerProcess.on('exit', function (code) {
			console.log('Child process exited with exit code ' + code);
		});
		console.log("client:"+getClientIp(req));
	} catch (err) {
	  callback(err);
	}
		
};



exports.list_all_items = function(req, res, callback) {
	if (err) res.json(err);
	var test_data=function(){
		return [
			{
				"id":"1",
				"alias":"spindle-0001"
			},
			{
				"id":"2",
				"alias":"spindle-0002"
			},
			{
				"id":"3",
				"alias":"spindle-0003"
			},
		];
	};
	callback(test_data);
};
