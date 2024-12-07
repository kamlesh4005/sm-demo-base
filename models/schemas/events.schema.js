const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date()
  }
},{ versionKey: false });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
