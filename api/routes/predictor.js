'use strict';
var express = require('express');
var router = express.Router();
var PredictController = require('../controllers/predictor-controller');


router.get('/', function (req, res) {
	PredictController.predict_result(req,res,function(result){
		res.json(result);
	} );
});
router.get('/:predictItemId', function (req, res) {
	PredictController.predict_result(req,res,function(result){
		res.json(result);
	} );
});

router.get('/', function (req, res) {
	PredictController.list_all_items(req,res,function(result){
		res.json(result);
	} );
});


module.exports = router;





