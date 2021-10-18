const { Schema, model } = require('mongoose');
const { databaseModelNames } = require('../config');

const oauthSchema = new Schema({

});

module.exports = model(databaseModelNames.OAUTH, oauthSchema);
