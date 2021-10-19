const { Schema, model } = require('mongoose');

const { databaseModelNames } = require('../config');

const oauthSchema = new Schema({
  access_token: {
    type: String,
    required: true
  },
  refresh_token: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: databaseModelNames.USER
  }
}, { timestamps: true });

module.exports = model(databaseModelNames.OAUTH, oauthSchema);
