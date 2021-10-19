const { User } = require('../models');

const { httpStatusCodes } = require('../config');

module.exports = {
  postUser: (async (req, res, next) => {
    try {
      const user = req.body;
      await User.create(user);

      res.status(httpStatusCodes.Created).json(user);
    } catch (error) {
      next(error);
    }
  }),

  getAllUsers: (async (req, res, next) => {
    try {
      const users = await User.find();

      res.json(users);
    } catch (error) {
      next(error);
    }
  }),

  getUserById: (async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }),

  patchUserById: (async (req, res, next) => {
    try {
      const { userId } = req.params;
      const editUser = req.body;

      const user = await User.findOneAndUpdate(userId, { ...editUser }, { new: true });

      res.json(user);
    } catch (error) {
      next(error);
    }
  }),

  deleteUserById: (async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await User.findByIdAndDelete(userId);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  })
};
