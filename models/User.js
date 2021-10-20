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
  },

  password: {
    type: String,
    trim: true,
    required: true,
    select: false
  }
}, { timestamps: true });

module.exports = model(databaseModelNames.USER, userSchema);
