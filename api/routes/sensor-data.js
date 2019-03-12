'use strict';
var express = require('express');
var router = express.Router();
module.exports = function(app) {
  var SensorDataController = require('../controllers/sensor-data-controller');


};

router.post('/', function (req, res) {
  SensorDataController.upload_a_batch_data();
});
router.get('/', function (req, res) {
  res.json('test');
  console.log('test');
});

module.exports = router;
