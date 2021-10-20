const { log } = require('util');
const { User } = require('../models');

const { emailService, passwordService } = require('../services');

const { httpStatusCodes, mailTemplateNames } = require('../config');

module.exports = {
  postUser: (async (req, res, next) => {
    try {
      const { password } = req.body;

      const hashed = await passwordService.hash(password);

      const user = await User.create({ ...req.body, password: hashed });

      await emailService.sendBroadcastMail(user.email, mailTemplateNames.WELCOME,
        {
          userName: user.firstName,
          buttonLink: 'localhost:5000/'
        });

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
