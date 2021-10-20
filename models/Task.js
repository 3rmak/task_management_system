const { Schema, model } = require('mongoose');
const { databaseModelNames, taskPriority } = require('../config');

const taskSchema = new Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  priority: {
    type: String,
    enum: Object.values(taskPriority),
    required: true
  },

  dueDate: {
    type: Date,
    default: new Date()
  },

  status: {
    type: Boolean,
    default: true
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: databaseModelNames.USER,
    required: true
  }
}, { timestamps: true });

module.exports = model(databaseModelNames.TASK, taskSchema);
