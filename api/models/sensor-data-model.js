'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SensorDataSchema = new Schema({
  name: {
    type: String
  },
  value: {
    Type: String
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Tasks', SensorDataSchema);