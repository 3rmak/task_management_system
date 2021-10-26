const { OAuth, User } = require('../models');

const { passwordService: { isPassMatch }, tokenService } = require('../services');

const ErrorHandler = require('../error/ErrorHandler');

const { httpStatusCodes, reqHeaderNames } = require('../config');

module.exports = {
  isCredentialsCorrect: (async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password +isActive');

      if (!user) {
        throw new ErrorHandler(httpStatusCodes.Unauthorized, 'Bad credentials');
      }

      if (!user.isActive) {
        throw new ErrorHandler(httpStatusCodes.Unauthorized, 'User is not activated. Check your mailbox');
      }
      const hashedPass = user.password;

      await isPassMatch(password, hashedPass);

      req.locals = {
        ...req.locals,
        user
      };

      next();
    } catch (error) {
      next(error);
    }
  }),

  isTokenValid: ((token_type = 'access') => (async (req, res, next) => {
    try {
      const tokenPayload = req.get(reqHeaderNames.AUTHORIZATION);

      if (!tokenPayload) {
        throw new ErrorHandler(httpStatusCodes.Forbidden, 'Missing Token');
      }

      const type = token_type === 'access' ? 'access_token' : 'refresh_token';

      const token = await OAuth.findOne({ [type]: tokenPayload });

      if (!token) {
        throw new ErrorHandler(httpStatusCodes.Unauthorized, 'Bad token');
      }

      await tokenService.verifyUserToken(tokenPayload, token_type);

      req.locals = {
        ...req.locals,
        token
      };

      next();
    } catch (e) {
      next(e);
    }
  })
  )
};
