'use strict';

const child_process = require('child_process');
var config = require('../../config.json');

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
				callback(result);
				

			}
		);
		workerProcess.on('exit', function (code) {
			console.log('Child process exited with exit code ' + code);
		});
	} catch (err) {
	  callback(err);
	}
		
};

