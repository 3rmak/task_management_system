const { OAuth, User } = require('../models');

const ErrorHandler = require('../error/ErrorHandler');

const { tokenService } = require('../services');
const { reqHeaderNames, httpStatusCodes } = require('../config');

module.exports = {
  signIn: (async (req, res, next) => {
    try {
      const { id } = req.locals.user;
      const {
        access_token,
        refresh_token
      } = tokenService.createUserTokens();

      const token = await OAuth.create({
        access_token,
        refresh_token,
        user: id
      });

      res.json(token);
    } catch (error) {
      next(error);
    }
  }),

  signOut: (async (req, res, next) => {
    try {
      const tokenPayload = req.get(reqHeaderNames.AUTHORIZATION);

      await OAuth.findOneAndRemove({ access_token: tokenPayload });

      res.json({ message: 'Done' });
    } catch (e) {
      next(e);
    }
  }),

  renewTokensByRefresh: async (req, res, next) => {
    try {
      const { token } = req.locals;

      const { access_token } = tokenService.createUserTokens();

      const item = await OAuth.findOneAndUpdate({ refresh_token: token.refresh_token },
        {
          access_token
        }, { new: true });

      res.json(item);
    } catch (error) {
      next(error);
    }
  },

  activateUser: async (req, res, next) => {
    try {
      const { email } = req[reqHeaderNames.QUERY];

      const user = await User.findOneAndUpdate({ email }, { isActive: true }, { new: true });

      if (!user) {
        throw new ErrorHandler(httpStatusCodes.Bad_Request, 'No user with such email. Try to sign up');
      }

      res.status(httpStatusCodes.Accepted).redirect('https://google.com');
    } catch (error) {
      next(error);
    }
  }
};
