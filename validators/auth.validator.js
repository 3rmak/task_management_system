const Joi = require('joi');

const { regex } = require('../config');

const signInValidator = Joi.object({
  email: Joi.string()
    .regex(regex.EMAIL_REGEX)
    .trim()
    .lowercase()
    .required()
    .email({
      tlds: {
        allow: [
          'com',
          'net',
          'ua'
        ]
      }
    }),

  password: Joi.string()
    .trim()
    .required()
});

module.exports = {
  signInValidator
};
