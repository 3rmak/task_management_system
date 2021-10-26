const { Schema, model } = require('mongoose');

const { user } = require('../helpers');

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
  },

  isActive: {
    type: Boolean,
    default: false,
    select: false
  }
}, { timestamps: true, toJSON: { virtuals: true } });

userSchema.virtual('fullName').get(function() {
  return user.nameNormalizator(`${this.firstName} ${this.lastName}`);
});

module.exports = model(databaseModelNames.USER, userSchema);
