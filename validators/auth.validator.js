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

const signOutValidator = Joi.object({
  access_token: Joi.string()
    .trim()
    .regex(regex.JWT_REGEX)
    .required()
});

const renewTokensByRefresh = Joi.object({
  refresh_token: Joi.string()
    .trim()
    .regex(regex.JWT_REGEX)
    .required()
});

module.exports = {
  signInValidator,
  signOutValidator,
  renewTokensByRefresh
};
