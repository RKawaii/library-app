const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BookSchema = new Schema({
  Title: {
    type: String,
    required: true
  },
  Author: {
    type: String,
    required: true
  },
  Description: {
    type: String
  },
  Publisher: {
    type: String,
    required: true
  },
  PublishDate: {
    type: Date,
    required: true
  },
  Volume: {
    type: Number
  },
  DateAdded: {
    type: Date,
    default: Date.now,
    required: true
  },
  imgExt: {
    type: String
  }
});

module.exports = BookSchema;
