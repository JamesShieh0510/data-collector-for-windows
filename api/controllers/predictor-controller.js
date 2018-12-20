'use strict';

const child_process = require('child_process');

exports.predict_result= function(req, res, callback) {
	var predictItemId='';
	if ( typeof req.params.predictItemId !== 'undefined' && req.params.predictItemId )
		predictItemId=req.params.predictItemId;

	try {
		var exe_path = '/Volumes/Document/Git/data-collector-for-windows/api/controllers/plugin/'

		var workerProcess = child_process.exec('ipython ./predict_online.py test-data/data/ '+predictItemId, {cwd: exe_path},
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
	  return "{result:error}";
	}
		
};

