const Joi = require('joi');

const { taskPriority } = require('../config');

const taskCreateValidator = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .trim()
    .required(),

  description: Joi.string()
    .required(),

  priority: Joi.number()
    .allow(...Object.values(taskPriority))
    .default(taskPriority.NEITHER)
    .required(),

  dueDate: Joi.date()
});

const taskEditValidator = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .trim(),

  description: Joi.string(),

  priority: Joi.number()
    .allow(...Object.values(taskPriority)),

  dueDate: Joi.date(),

  status: Joi.boolean()
});

module.exports = {
  taskCreateValidator,
  taskEditValidator
};
