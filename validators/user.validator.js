const Joi = require('joi');

const { regex } = require('../config');

const userCreateValidator = Joi.object({
  firstName: Joi.string()
    .trim()
    .uppercase()
    .required()
    .min(2)
    .max(30),

  lastName: Joi.string()
    .trim()
    .uppercase()
    .required()
    .min(2)
    .max(30),

  email: Joi.string()
    .email({
      tlds: {
        allow: [
          'com',
          'net',
          'ua'
        ]
      }
    })
    .lowercase()
    .trim()
    .regex(regex.EMAIL_REGEX)
    .required(),

  password: Joi.string()
    .required()
    .regex(regex.PASSWORD_REGEX)
    .trim()
});

module.exports = {
  userCreateValidator
};
