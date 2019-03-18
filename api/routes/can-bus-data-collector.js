'use strict';
var express = require('express');
var router = express.Router();
var DataController = require('../controllers/canbus-data-controller');


router.get('/canbus_raw_data/', function (req, res) {
	DataController.get_data(req,res,function(result){
		res.json(result);
	} );
});
router.get('/canbus_raw_data/:raw_data_item', function (req, res) {
	DataController.get_data(req,res,function(result){
		res.json(result);
	} );
});

router.get('/', function (req, res) {
	DataController.list_all_items(req,res,function(result){
		res.json(result);
	} );
});


module.exports = router;





