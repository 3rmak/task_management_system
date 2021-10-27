const path = require('path');

const { Task, User } = require('../models');

const { emailService, passwordService } = require('../services');

const { backendDeploy, httpStatusCodes, mailTemplateNames } = require('../config');

module.exports = {
  postUser: (async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const hashed = await passwordService.hash(password);

      const user = await User.create({ ...req.body, password: hashed, isActive: false });

      const buttonLink = path.join(
        `${backendDeploy.BACKEND_IP_ADDRESS}`,
        'api',
        'auth',
        'activate',
        `?email=${email}`
      );
      await emailService.sendBroadcastMail(user.email, mailTemplateNames.MAIL_REG_SUBMIT_TEMPLATE,
        {
          userName: user.firstName,
          buttonLink
        });

      res.status(httpStatusCodes.Created).json(user);
    } catch (error) {
      next(error);
    }
  }),

  getAllUsers: (async (req, res, next) => {
    try {
      // console.log('here');
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

      await Task.deleteMany({ owner: userId });

      const user = await User.findByIdAndDelete(userId);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  })
};
