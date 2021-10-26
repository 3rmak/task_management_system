const Joi = require('joi');

const { taskPriority } = require('../config');

const currentDate = (new Date().toLocaleDateString()).replaceAll('.', '-');

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
    .min(taskPriority.NEITHER)
    .max(taskPriority.EXTRA_IMPORTANT)
    .required(),

  dueDate: Joi.date()
    .min(currentDate)
});

const taskEditValidator = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .trim(),

  description: Joi.string(),

  priority: Joi.number()
    .min(taskPriority.NEITHER)
    .max(taskPriority.EXTRA_IMPORTANT),

  dueDate: Joi.date()
    .min(currentDate),

  status: Joi.boolean()
});

module.exports = {
  taskCreateValidator,
  taskEditValidator
};
