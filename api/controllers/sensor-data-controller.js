'use strict';

var formidable = require('formidable');

// var mongoose = require('mongoose'),
//   Task = mongoose.model('Tasks');

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.upload_a_batch_data = function(req, res) {
  //var new_task = new Task(req.body);
  //res.json(req.body);
  console.log(req.body);
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    if(err) {
        return res.redirect(303, '/error');
    }
    console.log('received fields: ');
    console.log(fields);
    console.log('received files: ');
    console.log(files);
    return res.redirect(303, '/thankyou');
  });
};


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};


