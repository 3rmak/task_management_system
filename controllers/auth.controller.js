const { OAuth } = require('../models');

const { tokenService } = require('../services');
const { httpStatusCodes } = require('../config');

module.exports = {
  signUp: (async (req, res, next) => {
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
      const { token } = req.locals;

      await OAuth.findOneAndRemove(token);

      res.status(httpStatusCodes.No_Content);
    } catch (e) {
      next(e);
    }
  }),

  renewTokensByRefresh: async (req, res, next) => {
    try {
      const { token } = req.locals;

      const { access_token, refresh_token } = tokenService.createUserTokens();

      const item = await OAuth.findOneAndUpdate({ refresh_token: token.refresh_token },
        {
          access_token,
          refresh_token
        });

      res.json({
        message: 'Tokens refreshed',
        access_token,
        refresh_token,
        user: item.user
      });
    } catch (error) {
      next(error);
    }
  }
};
