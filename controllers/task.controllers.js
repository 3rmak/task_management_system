const { Task } = require('../models');

const { httpStatusCodes } = require('../config');

module.exports = {
  postTask: (async (req, res, next) => {
    try {
      const task = { ...req.body };
      await Task.create(task);

      res.status(httpStatusCodes.Created).json(task);
    } catch (error) {
      next(error);
    }
  }),

  getAllTasks: (async (req, res, next) => {
    try {
      const tasks = await Task.find();

      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }),

  getTaskById: (async (req, res, next) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId);

      res.json(task);
    } catch (error) {
      next(error);
    }
  }),

  patchTask: (async (req, res, next) => {
    try {
      const { taskId } = req.params;
      const editTask = req.body;

      const task = await Task.findByIdAndUpdate(taskId, { ...editTask }, { new: true });

      res.json(task);
    } catch (error) {
      next(error);
    }
  }),

  deleteTask: (async (req, res, next) => {
    try {
      const { taskId } = req.params;

      const task = await Task.findByIdAndDelete(taskId);

      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  })
};
