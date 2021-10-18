const { Schema, model } = require('mongoose');
const { databaseModelNames } = require('../config');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
}, { timestamps: true });

module.exports = model(databaseModelNames.USER, userSchema);
