'use strict';
var express = require('express');
var router = express.Router();
var DataController = require('../controllers/data-controller');


router.get('/current_and_temperature/', function (req, res) {
	DataController.get_data(req,res,function(result){
		res.json(result);
	} );
});
router.get('/current_and_temperature/:raw_data_item', function (req, res) {
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





