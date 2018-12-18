'use strict';
module.exports = function(app) {
  var SensorDataController = require('../controllers/sensor-data-controller');

  // todoList Routes
  app.route('/sensors/')
    .post(SensorDataController.upload_a_batch_data);


  // app.route('/tasks/:taskId')
  //   .get(SensorData.read_a_task)
  //   .put(SensorData.update_a_task)
  //   .delete(SensorData.delete_a_task);
};