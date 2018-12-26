'use strict';

const child_process = require('child_process');
var config = require('../../config.json');

exports.get_data= function(req, res, callback) {
	var raw_data_item='';
	if ( typeof req.params.raw_data_item !== 'undefined' && req.params.raw_data_item )
		raw_data_item=req.params.raw_data_item;

	try {
		var exe_path = config.algorithm_path;
		var raw_data_path = config.raw_data_path;
		var current_and_temp_data_path = config.current_and_temp_data_path
		var current_and_temp_collector_cmd = config.current_and_temp_collector_cmd;
		var model_path = config.model_path;
		//python get_current_and_temp.py test-data/current/ test-data/data/
		console.log(current_and_temp_collector_cmd+' '+current_and_temp_data_path+' '+raw_data_path+' '+raw_data_item);

		var workerProcess = child_process.exec(current_and_temp_collector_cmd+' '+current_and_temp_data_path+' '+raw_data_path+' '+raw_data_item, {cwd: exe_path},
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
				callback({'target':result[1],'current':result[2],'temperature':result[3]});
				

			}
		);
		workerProcess.on('exit', function (code) {
			console.log('Child process exited with exit code ' + code);
		});
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
