const { Task } = require('../models');

const ErrorHandler = require('../error/ErrorHandler');

const { httpStatusCodes } = require('../config');

module.exports = {
  postTask: (async (req, res, next) => {
    try {
      const task = { ...req.body };
      const { user } = req.locals;
      await Task.create({ ...task, owner: user._id });

      res.status(httpStatusCodes.Created);
    } catch (error) {
      next(error);
    }
  }),

  getAllTasks: (async (req, res, next) => {
    try {
      const { user } = req.locals;
      const tasks = await Task.find({ owner: user._id });

      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }),

  getTaskById: (async (req, res, next) => {
    try {
      const { user } = req.locals;
      const { taskId } = req.params;
      const task = await Task.findOne({ _id: taskId, owner: user._id });

      if (!task) {
        throw new ErrorHandler(httpStatusCodes.Forbidden, 'No such task for this user');
      }

      res.json(task);
    } catch (error) {
      next(error);
    }
  }),

  patchTask: (async (req, res, next) => {
    try {
      const { user } = req.locals;
      const { taskId } = req.params;
      const editTask = req.body;

      const task = await Task.findOne({ _id: taskId, owner: user._id }, { ...editTask }, { new: true });

      if (!task) {
        throw new ErrorHandler(httpStatusCodes.Forbidden, 'No such task for this user');
      }

      res.json(task);
    } catch (error) {
      next(error);
    }
  }),

  deleteTask: (async (req, res, next) => {
    try {
      const { user } = req.locals;
      const { taskId } = req.params;

      const task = await Task.findOneAndDelete({ _id: taskId, owner: user._id });

      if (!task) {
        throw new ErrorHandler(httpStatusCodes.Forbidden, 'No such task for this user');
      }

      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  })
};
